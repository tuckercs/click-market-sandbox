import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { config } from 'constants/';

const dataNormalizers = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response?.data?.lotCollection) {
      const lots = response?.data?.lotCollection?.items;
      response.data = {
        lotCollection: {
          items: lots.filter((e) => !!e.sys?.publishedAt),
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

export default client;
