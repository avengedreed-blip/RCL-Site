import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto flex min-h-[62vh] max-w-[900px] items-center px-5 py-16 md:px-8">
        <div className="surface-panel w-full rounded-[6px] border border-rcl-copper/24 bg-rcl-surface p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.42)] md:p-12">
          <p className="text-sm font-black uppercase text-rcl-amber">404 · Page Not Found</p>
          <h1 className="brand-heading info-page-title mt-5 text-white">This route ends here</h1>
          <p className="mx-auto mt-6 max-w-[620px] text-base leading-8 text-rcl-muted">
            The page may have moved, or the address may be incomplete. The product catalog and studio pages remain available below.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/projects">View Products</ButtonLink>
            <ButtonLink href="/" variant="secondary">Return Home</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
