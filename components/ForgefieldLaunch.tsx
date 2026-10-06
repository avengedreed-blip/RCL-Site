import { ButtonLink } from "@/components/ButtonLink";
import { ForgefieldSteamLink } from "@/components/ForgefieldSteamLink";
import {
  forgefieldLaunch,
  forgefieldPrice,
  forgefieldReleaseDate,
  forgefieldCampaign,
} from "@/content/forgefield";

export function ForgefieldLaunch({
  productPage = false,
}: {
  productPage?: boolean;
}) {
  return (
    <div className="forgefield-launch" aria-label="Forgefield Steam launch">
      <div className="forgefield-launch__date">
        <p className="v2-eyebrow">{forgefieldCampaign.dateLabel}</p>
        <time dateTime={forgefieldLaunch.releaseDate}>
          {forgefieldReleaseDate}
        </time>
      </div>
      <div className="forgefield-launch__price">
        <p className="v2-eyebrow">{forgefieldCampaign.priceLabel}</p>
        <p>{forgefieldPrice}</p>
      </div>
      <div className="forgefield-launch__actions">
        <ForgefieldSteamLink />
        {!productPage ? (
          <ButtonLink
            href="/projects/forgefield"
            variant="ghost"
            prefetch={false}
          >
            Explore Forgefield
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
