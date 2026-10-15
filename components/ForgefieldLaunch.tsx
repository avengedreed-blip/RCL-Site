import { ButtonLink } from "@/components/ButtonLink";
import { ForgefieldSteamLink } from "@/components/ForgefieldSteamLink";
import { ForgefieldItchLink } from "@/components/ForgefieldItchLink";
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
    <div className="forgefield-launch" aria-label="Forgefield availability">
      <div className="forgefield-launch__date">
        <p className="forgefield-available">Available Now on itch.io</p>
        <p className="forgefield-steam-schedule">
          {forgefieldCampaign.heading}{" "}
          <time dateTime={forgefieldLaunch.releaseDate}>{forgefieldReleaseDate}</time>
          {" · "}{forgefieldPrice} USD
        </p>
      </div>
      <div className="forgefield-launch__actions">
        <ForgefieldItchLink productPage={productPage} />
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
