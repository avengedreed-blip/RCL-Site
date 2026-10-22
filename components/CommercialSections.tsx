import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { services, processSteps } from "@/content/commercial";

export function ServiceOffers({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`commercial-offers${detailed ? " commercial-offers--detailed" : ""}`}>
      {services.map((service, index) => (
        <article id={service.id} key={service.id}>
          <p className="commercial-index">0{index + 1}</p>
          <div className="commercial-offer-heading">
            <h3>{service.title}</h3>
            {detailed && <p className="commercial-range">Planning range<br />{service.range}</p>}
          </div>
          <div className="commercial-offer-body">
            <p>{service.body}</p>
            {detailed && <><p>{service.examples}</p><p className="commercial-note">{service.scope}</p></>}
          </div>
          {!detailed && (
            <Link className="commercial-text-link" href={`/services#${service.id}`} aria-label={`View scope for ${service.title}`}>
              View scope <span aria-hidden="true">↗</span>
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

export function WorkPreview() {
  return <div className="commercial-work-grid">
    <article className="commercial-work commercial-work--client">
      <a href="https://www.brotherhoodcoffeeco.com/" className="commercial-client-capture" aria-label="Explore the Brotherhood Coffee website" rel="noopener noreferrer"><Image src="/images/work/brotherhood-website-2026-10-21.jpg" width={1440} height={1000} alt="Brotherhood Coffee’s website, showing its roastery story, product navigation, and ordering link." sizes="(min-width: 800px) 52vw, 92vw" /></a>
      <div className="commercial-work-copy"><p className="v2-eyebrow">Client work / Business website</p><h3>Brotherhood Coffee Co.</h3><p>A roastery website with a coffee catalog, company story, wholesale inquiries, and ordering through its existing Square storefront.</p><p className="commercial-note">HTML, CSS, JavaScript · Managed checkout</p><a className="commercial-text-link" href="https://www.brotherhoodcoffeeco.com/" rel="noopener noreferrer">Visit the website <span aria-hidden="true">↗</span></a></div>
    </article>
    <article className="commercial-work">
      <Link href="/projects/forgefield" aria-label="Explore Forgefield"><Image src="/images/projects/forgefield-eventide-2026-09-20-960.webp" width={960} height={533} alt="Eventide in Forgefield, with a copper accretion disk around a dark center." sizes="(min-width: 800px) 45vw, 92vw" /></Link>
      <div className="commercial-work-copy"><p className="v2-eyebrow">Original RCL product / Released</p><h3>Forgefield</h3><p>Procedural desktop worlds built with modern Fortran and OpenGL. Available now on Steam and itch.io.</p><p className="commercial-note">Native Windows application · September 2026 build capture</p><Link className="commercial-text-link" href="/projects/forgefield">Explore Forgefield <span aria-hidden="true">↗</span></Link></div>
    </article>
  </div>;
}

export function StudioProcess() {
  return <ol className="commercial-process">{processSteps.map((step, index) => <li key={step.title}><span className="commercial-index">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>;
}

export function InquiryCta() {
  return <section className="v2-container commercial-closing" aria-labelledby="commercial-contact-title"><div><p className="v2-eyebrow">A useful next step</p><h2 id="commercial-contact-title">Tell us what needs to work better.</h2><p>A new website, a clearer interface, or fewer manual steps. Share the brief and we can discuss scope, fit, and timing.</p></div><ButtonLink href="/contact" variant="contact">Start a Project</ButtonLink></section>;
}
