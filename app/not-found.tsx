import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

const description =
  "The requested Reed Creative Labs page could not be found. Browse the current product catalog or return to the studio homepage.";

export const metadata: Metadata = {
  title: "Page Not Found",
  description,
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
  openGraph: {
    title: "Page Not Found | Reed Creative Labs",
    description,
    siteName: "Reed Creative Labs",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Page Not Found | Reed Creative Labs",
    description,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page">
      <section className="v2-container v2-not-found">
        <div>
          <p className="v2-eyebrow">404 · Page not found</p>
          <h1>This route ends here.</h1>
          <p>
            The page may have moved, or the address may be incomplete. The product catalog and studio pages remain available below.
          </p>
          <div className="v2-action-row">
            <ButtonLink href="/projects">View Products</ButtonLink>
            <ButtonLink href="/" variant="secondary">Return Home</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
