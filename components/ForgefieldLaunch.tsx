import { ButtonLink } from "@/components/ButtonLink";
import {
  forgefieldLaunch,
  forgefieldPrice,
  forgefieldReleaseDate,
  getSteamStoreUrl,
} from "@/content/forgefield";

export function ForgefieldLaunch({
  productPage = false,
}: {
  productPage?: boolean;
}) {
  const steamUrl = getSteamStoreUrl(forgefieldLaunch);
  return (
    <div className="forgefield-launch" aria-label="Forgefield Steam launch">
      <div className="forgefield-launch__date">
        <p className="v2-eyebrow">Launching on Steam</p>
        <time dateTime={forgefieldLaunch.releaseDate}>
          {forgefieldReleaseDate}
        </time>
      </div>
      <div className="forgefield-launch__price">
        <p className="v2-eyebrow">Launch price · USD</p>
        <p>{forgefieldPrice}</p>
      </div>
      <div className="forgefield-launch__actions">
        <ButtonLink
          href={
            productPage
              ? (steamUrl ?? "#gallery-title")
              : "/projects/forgefield"
          }
        >
          {productPage && steamUrl
            ? "View on Steam"
            : productPage
              ? "Explore the Worlds"
              : "Explore Forgefield"}
        </ButtonLink>
        {!productPage && steamUrl ? (
          <ButtonLink href={steamUrl} variant="secondary">
            View on Steam
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
