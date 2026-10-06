import { ButtonLink } from "@/components/ButtonLink";
import {
  forgefieldCampaign,
  forgefieldLaunch,
  getSteamStoreUrl,
} from "@/content/forgefield";

// Server-rendered, direct Steam link. Existing Speed Insights does not collect clicks.
export function ForgefieldSteamLink() {
  const href = getSteamStoreUrl(forgefieldLaunch);
  if (!href) return null;
  return (
    <ButtonLink href={href} className="forgefield-steam-cta" prefetch={false}>
      {forgefieldCampaign.ctaLabel}
    </ButtonLink>
  );
}
