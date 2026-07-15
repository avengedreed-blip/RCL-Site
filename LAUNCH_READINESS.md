# Reed Creative Labs Launch Readiness

Last reviewed: July 15, 2026

This is an internal operating checklist, not legal advice. It separates the
current marketing website from future product distribution, direct sales, and
client contracts. Owner input and professional legal or tax review are required
where noted.

## Current Website Baseline

- Static Next.js export hosted on Vercel.
- No public accounts, forms, checkout, newsletter, analytics, advertising, or
  intentional telemetry.
- Contact is direct email through `reedcreativelabs@gmail.com`.
- Public Privacy, Terms, Accessibility, and Security pages cover the current
  marketing website.
- `/.well-known/security.txt` uses the same public email and must be renewed
  before its July 15, 2027 expiration.
- The website does not currently distribute product installers or process sales.

## Owner Inputs Still Required

- Confirm the public operator or legal owner name before contracts or direct sales.
- Confirm business registration and governing jurisdiction; do not publish a
  jurisdiction until the owner approves it.
- Decide whether to establish a domain-based public email. Keep the Gmail address
  until a mailbox is verified and receiving mail.
- Select storefronts and confirm their payment, refund, tax, delivery, and customer
  record responsibilities.
- Define support channels, availability, update expectations, and end-of-support
  language per product. Do not promise response times without an operating plan.
- Confirm telemetry, crash reporting, cloud saves, leaderboards, advertising,
  account, and age-targeting decisions for every product.
- Confirm Forge model providers, local/remote execution options, credentials,
  code and prompt data flow, retention, and provider terms before public preview.
- Confirm whether Talk To Me AAC is child-directed and which caregiver, consent,
  deletion, export, and safety controls are required.
- Confirm Bloom's sensitive-data model, crisis-resource behavior, and intended
  health positioning before public testing.
- Verify provenance and commercial-use permission for every logo, screenshot,
  generated image, sound, font, icon, and third-party mark before distribution.
- Obtain legal and tax review before direct sales or a public product EULA.

## Policy Decision Matrix

| Item | Current decision | Trigger for review |
| --- | --- | --- |
| Privacy Policy | Public now | Any form, analytics, account, sale, download logging, telemetry, or product data flow |
| Website Terms | Public now | Product distribution, direct sales, new storefront, or materially different services |
| Accessibility Statement | Public now; no certification claim | New media, forms, documents, or interactive product demos |
| Security / disclosure | Public now | Product downloads, accounts, APIs, or dedicated security channel |
| Cookie Policy / banner | Not needed | Nonessential cookies or consent-requiring tracking |
| Refund / delivery policy | Not applicable now | Direct checkout or a separate RCL refund promise |
| Product EULA | Prepare before distribution | First public installer or package |
| Product privacy notice | Product-specific | Any product processes personal or device information |
| Third-party notices | Internal baseline now | Each product release bundle and website dependency change |
| AI use statement | Forge page qualification is sufficient now | Public preview with confirmed providers and data flows |
| Written services agreement | Required in a suitable form | Before accepting paid client work |
| Support policy | Product-specific | Before paid distribution or guaranteed support |

## Product Launch Gates

### Phase Arcade Volume I

- Confirm final PC and VR platform language, minimum requirements, input methods,
  headset compatibility, age rating, save data, online features, telemetry, and
  accessibility disclosures.
- Prepare game EULA, third-party notices, storefront copy, support/update policy,
  screenshots, trailer rights, malware scan, signed build where supported, and
  checksums for any direct download.
- Confirm whether scores, names, cloud saves, ads, or in-app purchases process data.
- If sold through Steam or itch.io, document which store handles payment, delivery,
  taxes, and refunds. Do not publish direct-sale terms unless direct sales exist.

### RCL Science Lab

- Document sources, assumptions, simplifications, units, numerical validation,
  known limitations, and educator guidance for each public simulation.
- Confirm minimum requirements, accessibility, classroom suitability, privacy,
  local progress storage, update/support policy, and school or educational licensing.
- Maintain the educational-model disclaimer; do not claim research, engineering,
  safety, medical, or professional validation without evidence.

### Forge

- Complete a written data-flow and threat review covering repositories, prompts,
  credentials, tools, local state, configured providers, logging, retention, and
  deletion.
- Publish only provider and privacy claims verified against the shipping build.
- Prepare EULA, third-party notices, secure update design, signing, download
  integrity, vulnerability response, support scope, and minimum requirements.
- Review user approval and autonomy behavior; do not imply that every model runs
  locally or that third-party providers do not receive configured requests.

### Android Games

- Complete Google Play data-safety, content rating, target-audience, ads, in-app
  purchase, permissions, and privacy disclosures per title.
- Confirm save data, score names, leaderboards, crash reporting, telemetry, age
  targeting, and account behavior. Add parental and consent controls when required.
- Prepare support contact, store listing, license notices, signed release artifacts,
  device testing, deletion/export handling where data exists, and update policy.

### Talk To Me AAC

- Conduct child-privacy, caregiver-consent, communication-safety, accessibility,
  data portability, deletion, backup, speech-provider, and app-store review.
- Define whether content stays local, how voices or cloud services process text,
  and what happens when a device is shared.
- Do not claim medical-device status, treatment, clinical validation, guaranteed
  communication outcomes, HIPAA, COPPA, FERPA, GDPR, or WCAG conformance without
  evidence and appropriate review.

### Bloom

- Complete sensitive-data, deletion/export, local/cloud storage, notification,
  analytics, and app-store privacy review.
- Define crisis-resource and emergency boundaries appropriate to the product and
  intended regions. Obtain professional review before public release.
- Do not present Bloom as treatment, diagnosis, clinical care, or an emergency service.

### Client Services

- Use a written services agreement or equivalent written contract before work
  begins. Cover scope, payment,
  deposits, cancellation, revisions, acceptance, timeline, client materials,
  accessibility, privacy, security responsibilities, ownership and licenses,
  portfolio permission, third-party costs, maintenance, hosting, and support.
- Treat quotes as binding only when the written agreement says they are.
- Establish a secure method before receiving credentials, regulated data, health
  records, payment data, or other highly sensitive client information.

### Direct Website Sales

- Owner and legal review are required before implementation.
- Select a payment provider and document merchant identity, taxes, receipts,
  regional availability, delivery, refunds, chargebacks, customer records, fraud,
  privacy, and support responsibilities.
- Publish product price, compatibility, license, delivery, refund, support, update,
  and accessibility information before checkout.
- Do not process raw payment-card data in RCL code unless a future architecture and
  compliance review explicitly justifies it.

## Operational Controls Before Selling

- Confirm domain renewal and account recovery ownership.
- Configure and monitor SPF, DKIM, and DMARC for any domain mailbox.
- Keep repository, Vercel, storefront, and email accounts protected by unique
  credentials and multi-factor authentication.
- Define release approval, reproducible build, malware scan, signing, checksums,
  backup, rollback, incident response, vulnerability intake, and dependency update
  procedures.
- Keep clean release artifacts and per-product license/notice bundles.
- Review insurance, business registration, sales-tax obligations, copyright
  registration options, and trademark search/registration with qualified advisers.

## Asset Provenance Gate

The repository contains original logos, generated/abstract marketing art, real
product screenshots, social previews, and Lucide icons. File presence is not proof
of ownership or commercial-use permission. Before a product or press-kit launch,
record the creator/source, creation date, license or permission, allowed uses,
product/build version, and owner approval for every shipped asset. Concept art and
generated art must not be described as product evidence or a real interface.
