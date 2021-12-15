import { FC, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloLink } from "@apollo/client/core";
import moment from "moment";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { config } from "@constants";

export const MojitoApiProvider: FC = ({ children }) => {
  const { getIdTokenClaims } = useAuth0();

  const dataNormalizers = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      if (response?.data) {
        const _data = response.data;

        if (_data.serverTime) {
          const serverTimeOffset =
            new Date(_data.serverTime).getTime() - Date.now();

          moment.now = function () {
            return serverTimeOffset + Date.now();
          };
        }

        if (_data?.me?.userOrgs?.[0]) {
          const _organization = _data.me.userOrgs[0];

          const role = _organization.role;
          const isBasic = role === "Basic";
          const isMissingInfo = role === "MissingInformation";
          const isEndUser = role === "EndUser";
          const isTransactionalNoID = role === "TransactionalNoID";
          const isTransactionalWithID = role === "TransactionalWithID";
          const isNotAllowedToBid = role === "NotAllowedToBid";
          const isCoreUnavailable = role === "CoreUnavailable";
          const isBidAuthUnavailable = role === "BidAuthUnavailable";
          const completeYourProfile = isBasic || isMissingInfo || isEndUser;
          const uploadID = isTransactionalNoID;
          const moreInformation = isNotAllowedToBid;
          const contactUs = isCoreUnavailable || isBidAuthUnavailable;

          Object.assign(_organization, {
            notifications: {
              isTransactionalWithID,
              completeYourProfile,
              uploadID,
              moreInformation,
              contactUs,
            },
            hasNotifications: !!(
              completeYourProfile ||
              uploadID ||
              moreInformation ||
              contactUs
            ),
          });

          _data.me.userOrgs[0] = _organization;
        }

        if (_data?.getMarketplaceAuctionLot) {
          _data.getMarketplaceAuctionLot = extendLot(
            _data.getMarketplaceAuctionLot
          );
        }

        if (_data?.collection?.items) {
          _data.collection.items = extendCollection(_data.collection.items);
        }

        if (_data?.collectionBySlug?.items) {
          _data.collectionBySlug.items = extendCollection(
            _data.collectionBySlug.items
          );
        }

        response.data = _data;
      }

      return response;
    });
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getIdTokenClaims();
    return {
      headers: {
        ...headers,
        ...(token
          ? {
              authorization: `Bearer ${token.__raw}`,
            }
          : {}),
      },
    };
  });

  const httpLink = createHttpLink({
    uri: config.MOJITO_API_URL
  });

  const client = useRef(
    new ApolloClient({
      link: authLink.concat(dataNormalizers).concat(httpLink),
      cache: new InMemoryCache(),
    })
  );
  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};

const extendCollection = (collectionItems: any) => {
  return (collectionItems = collectionItems.map((item: any) => {
    item.lot = extendLot(item.lot);
    return item;
  }));
};

const extendLot = (_lot: any) => {
  // _lot.endDate = moment().add(20, 's');

  const auctionStartUnix = moment(_lot.startDate || null).unix();
  const auctionEndUnix = moment(_lot.endDate || null).unix();
  // const auctionIsActive = _lot.status == EAuctionStatus.active;
  // const auctionIsCompleted = _lot.status == EAuctionStatus.completed;
  const nowUnix = moment().unix();

  Object.assign(_lot, {
    bidEndTimestamp: auctionEndUnix - nowUnix,
    bidView: {
      isPreSale: nowUnix < auctionStartUnix,
      isDuringSale: nowUnix > auctionStartUnix && nowUnix < auctionEndUnix,
      isPostSale: nowUnix > auctionEndUnix,
    },
  });

  return _lot;
};
