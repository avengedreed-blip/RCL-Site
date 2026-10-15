import { ButtonLink } from "@/components/ButtonLink";
import { forgefieldItch } from "@/content/forgefield";

export function ForgefieldItchLink({ productPage = false }: { productPage?: boolean }) {
  return (
    <ButtonLink href={forgefieldItch.url} className="forgefield-itch-cta" prefetch={false}>
      {productPage ? "Get Forgefield on itch.io" : "Get Forgefield"}
    </ButtonLink>
  );
}
