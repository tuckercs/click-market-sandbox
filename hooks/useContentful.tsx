import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  QueryHookOptions,
  useQuery,
} from "@apollo/client";
import { QueryResult } from "@apollo/client/react/types/types";
import { setContext } from "@apollo/client/link/context";
import { OperationVariables } from "@apollo/client/core";
import { contentfulQueries, EContentfulQueries } from "state";
import { config } from "constants/";
import { IAuction, IAuthor, ICollector, ILotData } from "interfaces";

const collectionsKeys = [
  "auctionCollection",
  "authorCollection",
  "collectorCollection",
  "lotCollection",
];
const dataNormalizers = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const key = response?.data ? Object.keys(response?.data)[0] : null;
    if (key && collectionsKeys.includes(key)) {
      const items = response?.data?.[key]?.items;
       response.data = {
        [key]: {
          items: items.filter((e: ILotData) => !!e.sys?.publishedAt),
        },
      };
    }

    return response;
  });
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${config.CONTENTFUL_AUTH_TOKEN}`,
    },
  };
});

const httpLink = createHttpLink({
  uri: config.CONTENTFUL_URL,
});

const client = new ApolloClient({
  link: authLink.concat(dataNormalizers).concat(httpLink),
  cache: new InMemoryCache(),
});

export function useContentful<T = any, D = OperationVariables>(
  query: EContentfulQueries,
  options?: QueryHookOptions<T, D>
): QueryResult<T, D> {
  if (!options) options = { client, errorPolicy: "ignore" };
  else {
    options.errorPolicy = "ignore";
    options.client = client;
  }
  return useQuery<T, D>(contentfulQueries[query], options);
}

export function useContentfulAuthors(
  options?: QueryHookOptions<any, OperationVariables>
): {
  authors: IAuthor[];
  authorsError: any;
  authorsLoading: boolean;
} {
  const { data, error, loading } = useContentful(
    EContentfulQueries.authors,
    options
  );
  if (error) console.error(error);

  return {
    authors: data?.authorCollection?.items ?? [],
    authorsError: error,
    authorsLoading: loading,
  };
}

export function useContentfulCollectors(
  options?: QueryHookOptions<any, OperationVariables>
): {
  collectors: ICollector[];
  collectorsError: any;
  collectorsLoading: boolean;
} {
  const { data, error, loading } = useContentful(
    EContentfulQueries.collectors,
    options
  );
  if (error) console.error(error);

  return {
    collectors: data?.collectorCollection?.items ?? [],
    collectorsError: error,
    collectorsLoading: loading,
  };
}

export function useContentfulLots(
  options?: QueryHookOptions<any, OperationVariables>
): {
  lots: ILotData[];
  lotsError: any;
  lotsLoading: boolean;
} {
  const { data, error, loading } = useContentful(
    EContentfulQueries.lots,
    options
  );
  if (error) console.error(error);

  return {
    lots: data?.lotCollection?.items ?? [],
    lotsError: error,
    lotsLoading: loading,
  };
}

export function useContentfulAuctions(
  options?: QueryHookOptions<any, OperationVariables>
): {
  auctions: IAuction[];
  auctionsError: any;
  auctionsLoading: boolean;
} {
  const { data, error, loading } = useContentful(
    EContentfulQueries.auctions,
    options
  );
  if (error) console.error(error);

  return {
    auctions: data?.auctionCollection?.items ?? [],
    auctionsError: error,
    auctionsLoading: loading,
  };
}
