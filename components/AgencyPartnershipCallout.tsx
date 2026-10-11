import { ButtonLink } from "@/components/ButtonLink";
import { partnershipEmailHref } from "@/content/contact";
import styles from "./AgencyPartnershipCallout.module.css";

export function AgencyPartnershipCallout({ inquiry = false }: { inquiry?: boolean }) {
  return (
    <section id={inquiry ? "agency-inquiry" : undefined} aria-labelledby={inquiry ? "agency-inquiry-title" : "agency-partnership-title"} className={`v2-container ${styles.section}`}>
      <div className={styles.copy}>
        <p className="v2-eyebrow">{inquiry ? "Agency partnership inquiries" : "For creative agencies & design studios"}</p>
        <h2 id={inquiry ? "agency-inquiry-title" : "agency-partnership-title"}>{inquiry ? "Tell us where you need technical support." : "Your creative direction. A dedicated technical partner."}</h2>
        <p>{inquiry
          ? "Share your agency, the project brief, target timing, budget range if known, and the work you would like RCL to handle. Mention any white-label or confidentiality needs; agree on terms before sending sensitive client materials."
          : "White-label development, design implementation, and focused software support. Work directly with a founder-led studio on a clearly defined project."}</p>
      </div>
      <div className={styles.action}>
        <ButtonLink href={inquiry ? partnershipEmailHref : "/agency-partners"} variant="contact">{inquiry ? "Email About a Partnership" : "Explore Agency Partnerships"}</ButtonLink>
        {inquiry && <p>Opens your email app with a subject line. You can also copy the studio address above.</p>}
      </div>
    </section>
  );
}
