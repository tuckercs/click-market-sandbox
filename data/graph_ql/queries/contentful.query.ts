import { gql } from "@apollo/client";

export enum EContentfulQueries {
  lots,
  auctions,
  collectors,
  authors,
}

export const contentfulQueries = {
  [EContentfulQueries.lots]: gql`
    query lot($title: String) {
      lotCollection(preview: true, order: lotId_ASC, where: { title: $title }) {
        items {
          lotId
          sys {
            id
            publishedAt
          }
          title
          imagesCollection {
            items {
              url
              title
              contentType
            }
          }
          createdAt
          estimatePrice
          purchasedAt
          smartContractAddress
          tokenId
          mojitoId
          author {
            about
            name
            slug
            avatar {
              url
              title
            }
          }
          collector {
            name
            slug
            about
            smartContractAddress
            avatar {
              url
              title
            }
            videoId
            twitterLink
          }
          aboutLot
          history
          video
          conditionReportText
          shortCollectorDescription
          nftLink
          slug
          nftVideoIds
          lotPreviewBackgroundColor
          gridPreviewImage {
            url
          }
        }
      }
    }
  `,
  [EContentfulQueries.auctions]: gql`
    query Auction($auctionSlug: String) {
      auctionCollection(
        preview: true
        order: sys_publishedAt_DESC
        where: { slug: $auctionSlug }
      ) {
        items {
          sys {
            publishedAt
          }
          name
          title
          subtitle
          duration
          description
          videoUrl
          slug
          lotsCollection {
            items {
              title
            }
          }
        }
      }
    }
  `,
  [EContentfulQueries.collectors]: gql`
    query Collector {
      collectorCollection(preview: true, order: name_ASC) {
        items {
          sys {
            publishedAt
          }
          name
          about
          smartContractAddress
          linkedFrom {
            lotCollection {
              items {
                title
              }
            }
          }
          avatar {
            url
            title
          }
          videoId
          twitterLink
          slug
        }
      }
    }
  `,
  [EContentfulQueries.authors]: gql`
    query Author {
      authorCollection(preview: true) {
        items {
          sys {
            publishedAt
          }
          about
          name
          slug
          avatar {
            url
            title
          }
          linkedFrom {
            lotCollection {
              items {
                title
              }
            }
          }
        }
      }
    }
  `,
};
