import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

// const dataNormalizers = new ApolloLink((operation, forward) => {
//   return forward(operation).map((response) => {
//     if (response?.data?.lotCollection) {
//       const lots = response?.data?.lotCollection?.items;
//       response.data = {
//         lotCollection: {
//           items: lots.filter((e: ILotData) => !!e.sys?.publishedAt),
//         },
//       };
//     }

//     return response;
//   });
// });

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer 19vUSnF3_8S-OsepxXBcDAI_Ua3GbwSy5c7HNTXB-R0`,
    },
  };
});

const httpLink = createHttpLink({
  uri: "https://graphql.contentful.com/content/v1/spaces/fu9did2d8yaw/environments/staging",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
