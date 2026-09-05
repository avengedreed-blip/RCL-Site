"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
  }, []);

  async function copyEmail() {
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    setFailed(false);
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <div>
      <button
        type="button"
        onClick={copyEmail}
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-rcl-copper/45 bg-black/20 px-4 text-xs font-black uppercase text-white transition duration-300 hover:-translate-y-0.5 hover:border-rcl-gold hover:text-rcl-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-gold"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {copied ? "Copied" : "Copy email"}
      </button>
      <p role="status" className={failed ? "mt-3 text-sm text-rcl-muted" : "sr-only"}>
        {failed
          ? "Copy unavailable. Select and copy the email address above."
          : copied ? "Email address copied." : ""}
      </p>
    </div>
  );
}
