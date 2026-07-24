import type { TechnicalProfile as TechnicalProfileData } from "@/content/projects";
import {
  getTechnicalProfileHighlights,
  getTechnicalProfileRows,
} from "@/lib/technical-profile";

export function CompactTechnicalProfile({
  profile,
}: {
  profile: TechnicalProfileData;
}) {
  const highlights = getTechnicalProfileHighlights(profile);

  if (highlights.length === 0) {
    return null;
  }

  return (
    <dl className="technical-profile-compact">
      <dt>Technology</dt>
      <dd>{highlights.join(" · ")}</dd>
    </dl>
  );
}

export function TechnicalProfile({
  profile,
  productSlug,
}: {
  profile: TechnicalProfileData;
  productSlug: string;
}) {
  const rows = getTechnicalProfileRows(profile);

  if (rows.length === 0) {
    return null;
  }

  return (
    <div
      className="v2-technical-profile"
      data-technical-profile={productSlug}
      data-verified-on={profile.verifiedOn}
    >
      <p className="v2-technical-profile__summary">{profile.summary}</p>
      <dl className="v2-technical-profile__ledger">
        {rows.map((row) => (
          <div key={row.key}>
            <dt>{row.label}</dt>
            <dd>{row.values.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
