import { gql } from "@apollo/client";

export enum EMojitoSubscriptions {
  timeNotifier,
  getMarketplaceAuctionLot
}

export const mojitoSubscriptions = {
  [EMojitoSubscriptions.timeNotifier]: gql`
    subscription TimeNotifier {
      timeNotifier {
        time
      }
    }
  `,
  [EMojitoSubscriptions.getMarketplaceAuctionLot]: gql`
    subscription GetMarketplaceAuctionLot($marketplaceAuctionLotId: UUID1!, $filter: BidFilterInput) {
      getMarketplaceAuctionLot(marketplaceAuctionLotId: $marketplaceAuctionLotId) {
        lotNumber
        startingBid
        feeStructure {
          buyersPremiumRate {
            from
            to
            rate
          }
          overheadPremiumRate {
            from
            to
            rate
          }
        }
        id
        bidEndTimestamp @client
        bidView @client {
          isPreSale
          isDuringSale
          isPostSale
        }
        marketplaceCollectionItemId
        startDate
        endDate
        status
        currentBid {
          id
          marketplaceAuctionLotId
          amount
          marketplaceUser {
            id
            username
            avatar
          }
          userOrganization {
            user {
              name
            }
          }
          isCurrent
          nextBidIncrement
          createdAt
        }
        bids(filter: $filter) {
          id
          createdAt
          isYou @client
          holdBid @client
          outbid @client
          outbidinfo @client
          marketplaceUser {
            id
            avatar
            username
          }
          marketplaceAuctionLotId
          marketplaceUser {
            id
            username
            avatar
          }
          amount
          userOrganization {
            user {
              name
            }
          }
        }
      }
    }
  `,
};
