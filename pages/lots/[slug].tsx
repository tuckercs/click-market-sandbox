/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { config } from "constants/";
import { BidFeed, StatusTag, BidConfirmModal } from "components";
import { useMojito, useLazyMojito, useFetchAfterAuth } from "hooks";
import { EMojitoQueries } from "state";
import styles from "styles/LotDetail.module.css";
import { formatCurrencyAmount } from "utils";
import { bidIncrement } from "utils/bidIncrement";
import Content from "metaverso.content.json";

const LotDetail: NextPage = ({ lot }: any) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSeeMoreLot, setIsSeeMoreLot] = useState(true);
  const [isSeeMoreAuthor, setIsSeeMoreAuthor] = useState(true);
  const [yourMaxBidIndex, setYourMaxBidIndex] = useState(-1);
  const [userAvailableMinBid, setUserAvailableMinBid] = useState(
    bidIncrement[0]
  );
  const router = useRouter();

  const { data: mojitoLotData } = useMojito(EMojitoQueries.oneLot, {
    variables: {
      marketplaceAuctionLotId: lot.mojitoId,
    },
  });
  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };
  console.log("mojitoLotData:", mojitoLotData);
  const isLotDescriptionLong = lot.about.length > 350;
  const isAboutAuthorLong = lot.author.about.length > 150;
  let currentBid;
  if (mojitoLotData)
    currentBid = mojitoLotData.getMarketplaceAuctionLot.currentBid;

  // let _yourMaxBidIndex = -1;
  useEffect(() => {
    if (!!mojitoLotData?.getMarketplaceAuctionLot.bids.length) {
      let userMaxBid = 0;
      let bids = mojitoLotData?.getMarketplaceAuctionLot.bids;
      bids = bids?.map((bid: any) => {
        bid.isYou = profile?.me.id == bid.marketplaceUser.id;
        if (bid.maximumBid && bid.maximumBid >= userMaxBid)
          userMaxBid = bid.maximumBid;
        return bid;
      });

      setYourMaxBidIndex(bids.findIndex((bid: any) => bid.isYou));

      if (userMaxBid) {
        const nextIncrementID =
          bidIncrement.findIndex((e) => e === userMaxBid) + 1;
        if (
          bidIncrement[nextIncrementID] &&
          mojitoLotData?.getMarketplaceAuctionLot.currentBid?.nextBidIncrement <
            bidIncrement[nextIncrementID]
        ) {
          setUserAvailableMinBid(bidIncrement[nextIncrementID]);
        } else {
          setUserAvailableMinBid(
            mojitoLotData?.getMarketplaceAuctionLot.currentBid?.nextBidIncrement
          );
        }
      } else {
        setUserAvailableMinBid(
          mojitoLotData?.getMarketplaceAuctionLot.currentBid
            ?.nextBidIncrement ?? 0
        );
      }
    }
  }, [
    mojitoLotData?.getMarketplaceAuctionLot.bids,
    mojitoLotData?.getMarketplaceAuctionLot.bids.length,
    mojitoLotData?.getMarketplaceAuctionLot.currentBid.id,
    mojitoLotData?.getMarketplaceAuctionLot.currentBid?.nextBidIncrement,
    profile?.me.id,
  ]);

  useEffect(() => {
    let bids = mojitoLotData?.getMarketplaceAuctionLot.bids;
    if (yourMaxBidIndex == 0) bids[0].holdBid = true;
    else if (yourMaxBidIndex > 0) {
      bids[yourMaxBidIndex].outbid = true;
      if (bids[0].amount == bids[yourMaxBidIndex].amount) {
        bids[yourMaxBidIndex].outbidinfo = true;
      }
    }
  }, [yourMaxBidIndex]);

  return (
    <main className={styles.main}>
      {yourMaxBidIndex > -1 &&
        !!mojitoLotData?.getMarketplaceAuctionLot.bids.length &&
        profile &&
        mojitoLotData?.getMarketplaceAuctionLot.bidView.isDuringSale && (
          <div className={styles.topBanner}>
            {yourMaxBidIndex === 0 ? (
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
              <video
                className={styles.video}
                width={612}
                controls
                preload="auto"
              >
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
            {mojitoLotData?.getMarketplaceAuctionLot.bidView.isDuringSale &&
              currentBid && (
                <p className={styles.currentBid}>
                  Current bid:{" "}
                  <span>
                    {formatCurrencyAmount(
                      currentBid?.amount ? currentBid?.amount : 0
                    )}
                  </span>
                </p>
              )}
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
                        {yourMaxBidIndex === 0 ? (
                          <button
                            className={styles.button}
                            onClick={() => setShowConfirmModal(true)}
                          >
                            INCREASE BID
                          </button>
                        ) : (
                          <button
                            className={styles.button}
                            onClick={() => setShowConfirmModal(true)}
                          >
                            {yourMaxBidIndex > 0 ? "BID AGAIN!" : "BID NOW!"}
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
                currentBid && (
                  <div className={styles.winner}>
                    <div>
                      Winning Bid:{" "}
                      <span>{formatCurrencyAmount(currentBid.amount)}</span>
                    </div>
                    <div>
                      By{" "}
                      <span>
                        {currentBid.marketplaceUser.id === profile?.me.id
                          ? "You"
                          : currentBid.marketplaceUser.username ||
                            currentBid.userOrganization.user.name}
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
            profile={profile}
          />
        )}
        {showConfirmModal && (
          <BidConfirmModal
            handleClose={() => setShowConfirmModal(false)}
            lot={lot}
            mojitoLotData={mojitoLotData?.getMarketplaceAuctionLot}
            userAvailableMinBid={userAvailableMinBid}
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
