export const TELEGRAM_CHANNEL_URL = "https://t.me/studyaza";

/** Official Telegram paper-plane mark used for channel links without exposing handle text. */
export function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="11" fill="#229ED9" />
      <path
        d="M16.95 7.42c.22-.92-.34-1.28-.96-1.05L6.52 10.02c-.64.25-.63.61-.11.77l2.43.76 5.63-3.55c.26-.16.51-.07.31.11l-4.56 4.12-.17 2.52c.25 0 .36-.11.5-.25l1.2-1.17 2.5 1.85c.46.25.79.12.91-.43l1.79-7.33Z"
        fill="#fff"
      />
    </svg>
  );
}
