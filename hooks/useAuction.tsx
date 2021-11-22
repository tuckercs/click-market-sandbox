import { useContentfulAuctions } from "hooks";
import { IAuction } from "interfaces";
import { useRouter } from "next/router";

export function useAuction(): {
  isAuction: boolean;
  auction: IAuction;
  slug: string;
} {
  const { auctions } = useContentfulAuctions();
  const { query } = useRouter();
  const pathSlug = query.path?.[0];

  const auction: IAuction = pathSlug
    ? auctions?.find((item) => pathSlug === item.slug) || auctions[0]
    : auctions[0];

  return {
    isAuction: !!(auction && pathSlug && pathSlug === auction.slug),
    auction,
    slug: auction?.slug,
  };
}
