/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { LOT_POLL_INTERVAL, config } from "constants/";
import { BidFeed, StatusTag, BidConfirmModal } from "components";
import { useMojito } from "hooks";
import { EMojitoQueries } from "state";
import styles from "styles/LotDetail.module.css";
import { formatCurrencyAmount } from "utils";
import Content from "metaverso.content.json";

const LotDetail: NextPage = ({ lot }: any) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSeeMoreLot, setIsSeeMoreLot] = useState(true);
  const [isSeeMoreAuthor, setIsSeeMoreAuthor] = useState(true);
  const [hasBid, setHasBid] = useState(false);
  const router = useRouter();

  const { data: mojitoLotData } = useMojito(EMojitoQueries.oneLot, {
    pollInterval: LOT_POLL_INTERVAL,
    variables: {
      marketplaceAuctionLotId: lot.mojitoId,
    },
  });
  const { data: profile } = useMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };

  const isLotDescriptionLong = lot.about.length > 350;
  const isAboutAuthorLong = lot.author.about.length > 150;
console.log('mojitoLotData:',mojitoLotData)
  return (

      <main className={styles.main}>
        {hasBid &&
          mojitoLotData &&
          !!mojitoLotData.getMarketplaceAuctionLot.bids.length &&
          profile && (
            <div className={styles.topBanner}>
              {mojitoLotData.getMarketplaceAuctionLot.bids[0].marketplaceUser
                .id === profile.me.id ? (
                <div className={styles.yourBid}>
                  Your bid is the highest so far 🥇
                </div>
              ) : (
                <div className={styles.outbid}>You have been outbid! ⚠️</div>
              )}
            </div>
          )}
        <div className={styles.content}>
          <div className={styles.detailContainer}>
            <div className={styles.detailLeft}>
              {lot.format === "image" && (
                <img
                  className={styles.image}
                  src={lot.images[0]}
                  alt={lot.title}
                  width={612}
                />
              )}
              {lot.format === "video" && (
                <video className={styles.video} width={612} controls>
                  <source src={lot.videos[0]} type="video/mp4" />
                </video>
              )}
            </div>

            <div className={styles.detailRight}>
              {mojitoLotData && (
                <>
                  <div className={styles.row}>
                    <span>#{lot.lotId}</span>
                    <StatusTag
                      mojitoLotData={mojitoLotData.getMarketplaceAuctionLot}
                    />
                  </div>
                </>
              )}
              <p className={styles.lotTitle}>{lot.title}</p>
              <p className={styles.lotDescription}>
                {`${
                  isSeeMoreLot && isLotDescriptionLong
                    ? `${lot.about.slice(0, 350)}...`
                    : lot.about
                } `}
                {isLotDescriptionLong && (
                  <span
                    onClick={() => setIsSeeMoreLot(!isSeeMoreLot)}
                    className={styles.moreText}
                  >
                    {isSeeMoreLot ? "See more" : "See less"}
                  </span>
                )}
              </p>
              <div className={styles.author}>
                <div className={styles.authorImage}>
                  <Image
                    className={styles.image}
                    src={lot.author.avatar.url}
                    alt={lot.author.avatar.title}
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <h3 className={styles.authorName}>{lot.author.name}</h3>
                  <p className={styles.lotDescription}>
                    {`${
                      isSeeMoreAuthor && isAboutAuthorLong
                        ? `${lot.author.about.slice(0, 150)}...`
                        : lot.author.about
                    } `}
                    {isAboutAuthorLong && (
                      <span
                        onClick={() => setIsSeeMoreAuthor(!isSeeMoreAuthor)}
                        className={styles.moreText}
                      >
                        {isSeeMoreAuthor ? "See more" : "See less"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {mojitoLotData?.getMarketplaceAuctionLot.bidView.isPreSale && (
                  <button className={styles.disabledButton} disabled>
                    AVAILABLE SOON
                  </button>
                )}
                {mojitoLotData?.getMarketplaceAuctionLot.bidView.isDuringSale &&
                  !isLoading && (
                    <>
                      {isAuthenticated ? (
                        <>
                          {mojitoLotData && mojitoLotData.getMarketplaceAuctionLot.currentBid && profile && mojitoLotData.getMarketplaceAuctionLot.currentBid
                            .marketplaceUser.id === profile?.me.id ? (
                            <button className={styles.disabledButton} disabled>
                              YOUR BID WAS SENT
                            </button>
                          ) : (
                            <button
                              className={styles.button}
                              onClick={() => setShowConfirmModal(true)}
                            >
                              {hasBid &&
                              mojitoLotData?.getMarketplaceAuctionLot.currentBid
                                ?.marketplaceUser.id !== profile?.me.id
                                ? "BID AGAIN!"
                                : "BID NOW!"}
                            </button>
                          )}
                        </>
                      ) : (
                        <button className={styles.button} onClick={login}>
                          SIGN IN
                        </button>
                      )}
                    </>
                  )}
                {mojitoLotData?.getMarketplaceAuctionLot.bidView.isPostSale &&
                  mojitoLotData.getMarketplaceAuctionLot.currentBid && (
                    <div className={styles.winner}>
                      <div>
                        Winning Bid:{" "}
                        <span>
                          {formatCurrencyAmount(
                            mojitoLotData.getMarketplaceAuctionLot.currentBid
                              .amount
                          )}
                        </span>
                      </div>
                      <div>
                        By{" "}
                        <span>
                          {
                            mojitoLotData.getMarketplaceAuctionLot.currentBid
                              .userOrganization.user.name
                          }
                        </span>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {!!mojitoLotData?.getMarketplaceAuctionLot.bids.length && (
            <BidFeed
              bids={mojitoLotData.getMarketplaceAuctionLot.bids}
              userId={profile?.me.id}
            />
          )}
          {showConfirmModal && (
            <BidConfirmModal
              handleClose={() => setShowConfirmModal(false)}
              lot={lot}
              mojitoLotData={mojitoLotData?.getMarketplaceAuctionLot}
              setHasBid={(value: boolean) => setHasBid(value)}
            />
          )}
        </div>
      </main>
  );
};

export default LotDetail;

export async function getServerSideProps({ params }: any) {
  const { lots } = Content;
  const lot = lots.find((lot) => lot.slug == params.slug);

  return {
    props: {
      lot: lot,
    },
  };
}
