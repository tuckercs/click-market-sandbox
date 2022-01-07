import {
  ApolloError,
  QueryHookOptions,
  QueryLazyOptions,
} from "@apollo/client";
import { config } from "@constants";
import { useLazyMojito, useMojito } from "@hooks";
import { EMojitoQueries } from "@state";

export function useCollection(
  slug: string,
  options?: QueryHookOptions
): {
  collection: any;
  collectionLoading: boolean;
  collectionError: ApolloError | undefined;
  hasMultipleLots: boolean;
} {
  const { data, error, loading } = useMojito(EMojitoQueries.collectionBySlug, {
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    ...options,
  });

  return {
    collection: data?.collectionBySlug,
    collectionLoading: loading,
    collectionError: error,
    hasMultipleLots: data?.collectionBySlug?.items?.length > 1,
  };
}

export function useLazyCollection(
  slug: string,
  options?: QueryHookOptions
): {
  getCollectionData: (
    options?:
      | QueryLazyOptions<{ slug: string; marketplaceID: string }>
      | undefined
  ) => void;
  collection: any;
  collectionLoading: boolean;
  collectionError: ApolloError | undefined;
  collectionRefetch: any;
  hasMultipleLots: boolean;
} {
  const [getData, { data, loading, error, refetch }] = useLazyMojito(
    EMojitoQueries.collectionBySlug,
    { variables: { slug, marketplaceID: config.MARKETPLACE_ID }, ...options }
  );

  return {
    getCollectionData: getData,
    collection: data?.collectionBySlug,
    collectionLoading: loading,
    collectionError: error,
    collectionRefetch: refetch,
    hasMultipleLots: data?.items?.length > 1,
  };
}
