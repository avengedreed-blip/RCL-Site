"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[3px] border border-rcl-copper/45 bg-black/20 px-4 text-xs font-black uppercase text-white transition duration-300 hover:-translate-y-0.5 hover:border-rcl-gold hover:text-rcl-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rcl-gold"
      aria-live="polite"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
