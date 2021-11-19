import { gql } from "@apollo/client";

export enum EMojitoMutations {
  saveLotToFavorites,
  removeLotFromFavorites,
  createBid,
  updateUserOrgSettings,
}

export const mojitoMutations = {
  [EMojitoMutations.saveLotToFavorites]: gql`
    mutation AddLotToUserFavorites($lotId: UUID1!) {
      addLotToUserFavorites(lotId: $lotId)
    }
  `,
  [EMojitoMutations.removeLotFromFavorites]: gql`
    mutation RemoveLotFromUserFavorites($lotId: UUID1!) {
      deleteLotFromUserFavorites(lotId: $lotId)
    }
  `,
  [EMojitoMutations.createBid]: gql`
    mutation CreateMarketplaceAuctionBid(
      $marketplaceAuctionLotId: UUID!
      $amount: Float!
    ) {
      createMarketplaceAuctionBid(
        marketplaceAuctionBid: {
          marketplaceAuctionLotId: $marketplaceAuctionLotId
          amount: $amount
        }
      ) {
        id
        amount
        marketplaceAuctionLotId
        userId
      }
    }
  `,
  [EMojitoMutations.updateUserOrgSettings]: gql`
    mutation (
      $userOrgId: String!
      $username: String
      $avatar: String
      $settingsJson: String
    ) {
      updateUserOrgSettings(
        params: {
          userOrgId: $userOrgId
          username: $username
          avatar: $avatar
          settingsJson: $settingsJson
        }
      ) {
        id
      }
    }
  `,
};
