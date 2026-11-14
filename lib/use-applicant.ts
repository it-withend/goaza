"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LIST_KEY,
  parseDoneTasks,
  parseList,
  parseProfile,
  PROFILE_KEY,
  serializeProfile,
  TASKS_KEY,
  type ApplicantProfile,
} from "@/lib/profile";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode or quota — keep working in memory */
  }
}

/**
 * Profile, "my list" and finished tasks, persisted in localStorage and synced across tabs.
 * List updates are functional so rapid toggles (or calls after an await) never lose items.
 */
export function useApplicant() {
  const [ready, setReady] = useState(false);
  const [profile, setProfileState] = useState<ApplicantProfile | null>(null);
  const [list, setList] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const load = () => {
      setProfileState(parseProfile(read(PROFILE_KEY)));
      setList(parseList(read(LIST_KEY)));
      setDone(parseDoneTasks(read(TASKS_KEY)));
    };
    load();
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (!e.key || [PROFILE_KEY, LIST_KEY, TASKS_KEY].includes(e.key)) load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setProfile = useCallback((p: ApplicantProfile) => {
    setProfileState(p);
    write(PROFILE_KEY, serializeProfile(p));
  }, []);

  const updateList = useCallback((fn: (prev: string[]) => string[]) => {
    setList((prev) => {
      const next = parseList(JSON.stringify(fn(prev)));
      write(LIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggle = useCallback(
    (slug: string) => updateList((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    [updateList],
  );

  const addMany = useCallback((slugs: string[]) => updateList((prev) => [...prev, ...slugs]), [updateList]);

  const removeMany = useCallback(
    (slugs: string[]) => updateList((prev) => prev.filter((s) => !slugs.includes(s))),
    [updateList],
  );

  const toggleTask = useCallback((id: string) => {
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      write(TASKS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((slug: string) => list.includes(slug), [list]);

  return { ready, profile, setProfile, list, toggle, addMany, removeMany, has, done, toggleTask };
}
