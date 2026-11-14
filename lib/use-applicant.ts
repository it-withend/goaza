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

/** Profile, "my list" and finished tasks, persisted in localStorage and synced across tabs. */
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

  const saveList = useCallback((next: string[]) => {
    const clean = parseList(JSON.stringify(next));
    setList(clean);
    write(LIST_KEY, JSON.stringify(clean));
  }, []);

  const toggle = useCallback(
    (slug: string) => saveList(list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]),
    [list, saveList],
  );

  const addMany = useCallback((slugs: string[]) => saveList([...list, ...slugs]), [list, saveList]);

  const toggleTask = useCallback(
    (id: string) => {
      const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
      setDone(next);
      write(TASKS_KEY, JSON.stringify(next));
    },
    [done],
  );

  const has = useCallback((slug: string) => list.includes(slug), [list]);

  return { ready, profile, setProfile, list, toggle, addMany, has, done, toggleTask };
}
