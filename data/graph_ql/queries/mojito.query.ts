import { gql } from "@apollo/client";

export enum EMojitoQueries {
  checkUsername,
  profile,
  organization,
  oneLot,
  collectionBySlug,
  marketplace,
  userActiveBids,
  userFavorites,
  serverTime,
}

export const mojitoQueries = {
  [EMojitoQueries.profile]: gql`
    query GetProfile($organizationID: UUID!, $filter: UserOrgFilter) {
      serverTime
      me {
        id
        activeBids(orgId: $organizationID) {
          id
          amount
          marketplaceAuctionLot {
            id
            status
            currentBid {
              amount
              id
            }
            bids {
              amount
            }
          }
        }
        user {
          id
          username
          email
        }
        userOrgs(filter: $filter) {
          id
          organizationId
          role
          bidAllowed
          kycStatus
          avatar
          username
          settings
          notifications @client {
            completeYourProfile
            uploadID
            moreInformation
            contactUs
          }
          hasNotifications @client
        }
        favoriteLots {
          id
        }
      }
    }
  `,
  [EMojitoQueries.organization]: gql`
    query GetOrganization($filter: UserOrgFilter) {
      serverTime
      me {
        id
        userOrgs(filter: $filter) {
          id
          role
          kycStatus
          bidAllowed
          avatar
          username
          settings
          notifications @client {
            isTransactionalWithID
            completeYourProfile
            uploadID
            moreInformation
            contactUs
          }
          hasNotifications @client
        }
      }
    }
  `,
  [EMojitoQueries.userActiveBids]: gql`
    query GetUserActiveBids($organizationID: UUID!) {
      serverTime
      me {
        id
        activeBids(orgId: $organizationID) {
          id
          amount
          marketplaceAuctionLot {
            id
            status
            currentBid {
              amount
              id
            }
            bids {
              amount
            }
          }
        }
      }
    }
  `,
  [EMojitoQueries.userFavorites]: gql`
    query GetUserFavorites {
      serverTime
      me {
        id
        favoriteLots {
          id
        }
      }
    }
  `,
  [EMojitoQueries.checkUsername]: gql`
    query CheckUsername($organizationID: String!, $username: String!) {
      orgUsernameAvailable(organizationID: $organizationID, username: $username)
    }
  `,
  [EMojitoQueries.collectionBySlug]: gql`
    query GetLots($slug: String!, $marketplaceID: UUID1!) {
      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {
        id
        items {
          name
          id
          lot {
            id
            bidEndTimestamp @client
            bidView @client {
              isPreSale
              isDuringSale
              isPostSale
            }
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
            marketplaceCollectionItemId
            startDate
            endDate
            status
            currentBid {
              id
              marketplaceAuctionLotId
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
              amount
              isCurrent
              nextBidIncrement
              createdAt
            }
            myBid {
              id
              createdAt
              marketplaceAuctionLotId
              amount
            }
          }
        }
      }
    }
  `,
  [EMojitoQueries.marketplace]: gql`
    query GetMarketplace($id: UUID!) {
      marketplace(id: $id) {
        id
        name
        collections {
          id
          items {
            id
            name
            slug
            lot {
              id
            }
          }
        }
      }
    }
  `,
  [EMojitoQueries.oneLot]: gql`
    query GetLot($marketplaceAuctionLotId: UUID!, $filter: BidFilterInput) {
      getMarketplaceAuctionLot(
        marketplaceAuctionLotId: $marketplaceAuctionLotId
      ) {
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
          maximumBid
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
  [EMojitoQueries.serverTime]: gql`
    query {
      serverTime
    }
  `,
};
