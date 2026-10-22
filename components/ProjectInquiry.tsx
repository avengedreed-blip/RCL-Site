"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { budgetBands, projectTypes, timelines } from "@/content/inquiry";
import { prepareInquiry } from "@/lib/inquiry";

const subscribe = () => () => {};
export function ProjectInquiry() {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const form = useRef<HTMLFormElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<{ body: string; href: string } | null>(null);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const selectPartnership = () => {
      if (window.location.hash === "#agency-inquiry") {
        const select = form.current?.elements.namedItem("type");
        if (select instanceof HTMLSelectElement) select.value = "Agency partnership";
      }
    };
    selectPartnership();
    window.addEventListener("hashchange", selectPartnership);
    return () => window.removeEventListener("hashchange", selectPartnership);
  }, []);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prepared = prepareInquiry(new FormData(event.currentTarget));
    if ("error" in prepared) { setDraft(null); setStatus(prepared.error); return; }
    setDraft(prepared);
    setStatus("Your draft is ready. Nothing has been sent. Open your email app or copy the draft, then send it to the studio.");
    window.requestAnimationFrame(() => result.current?.focus());
  }
  async function copy() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(draft.body); setStatus("Draft copied. Paste it into an email to reedcreativelabs@gmail.com and send it when ready."); }
    catch { setStatus("Copy is unavailable in this browser. Select and copy the draft below, or open your email app."); }
  }
  return <form ref={form} className="inquiry-form" onSubmit={prepare} onChange={() => { if (draft) { setDraft(null); setStatus("Your details changed. Prepare an updated draft before sending."); } }} aria-labelledby="inquiry-title" aria-describedby="inquiry-delivery-note">
    <h2 id="inquiry-title">Your project brief</h2>
    <p id="inquiry-delivery-note">This form prepares an email draft on your device. It does not send or save your inquiry. You review and send it using your email app. All fields are required unless marked optional.</p>
    <noscript><p>Enable JavaScript to prepare a draft, or use the direct email link alongside this form.</p></noscript>
    <div className="inquiry-grid">
      <label htmlFor="inquiry-name">Name<input id="inquiry-name" name="name" autoComplete="name" required maxLength={100} /></label>
      <label htmlFor="inquiry-company">Company <span>(optional)</span><input id="inquiry-company" name="company" autoComplete="organization" maxLength={150} /></label>
      <label className="inquiry-wide" htmlFor="inquiry-email">Business email<input id="inquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label className="inquiry-wide" htmlFor="inquiry-type">Project type<select id="inquiry-type" name="type" defaultValue="" required><option value="" disabled>Select a project type</option>{projectTypes.map(x => <option key={x}>{x}</option>)}</select></label>
      <label htmlFor="inquiry-budget">Approximate budget<select id="inquiry-budget" name="budget" defaultValue="" required><option value="" disabled>Select a budget band</option>{budgetBands.map(x => <option key={x}>{x}</option>)}</select></label>
      <label htmlFor="inquiry-timeline">Desired timeline<select id="inquiry-timeline" name="timeline" defaultValue="" required><option value="" disabled>Select a timeline</option>{timelines.map(x => <option key={x}>{x}</option>)}</select></label>
      <label className="inquiry-wide" htmlFor="inquiry-brief">Brief requirements<textarea id="inquiry-brief" name="brief" rows={6} required minLength={20} maxLength={1500} aria-describedby="brief-help" /></label>
    </div>
    <p id="brief-help" className="commercial-note">20–1,500 characters. What needs to work better, who is it for, and what already exists? Please omit passwords and sensitive personal or business records.</p>
    <div className="inquiry-trap" aria-hidden="true"><label htmlFor="inquiry-website">Leave empty<input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="inquiry-consent"><input type="checkbox" name="acknowledgment" required /><span>I understand that I must send the email myself and have read how inquiries are handled in the <Link href="/privacy">privacy policy</Link>.</span></label>
    <button className="inquiry-button" type="submit" disabled={!ready}>Prepare Email Draft</button>
    <p role="status" aria-live="polite">{status}</p>
    {draft && <div ref={result} className="inquiry-result" tabIndex={-1} aria-label="Prepared email draft"><h3>Ready for your email app</h3><div className="commercial-actions"><a className="inquiry-button" href={draft.href}>Open Email App</a><button type="button" className="inquiry-button" onClick={copy}>Copy Draft</button></div><p className="commercial-note">If your email app does not open or leaves out the text, copy the draft instead.</p><label htmlFor="prepared-draft">Your draft<textarea id="prepared-draft" rows={10} value={draft.body} readOnly /></label></div>}
  </form>;
}
