/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import momentTimeZone from "moment-timezone";
import { IAuctionLotBidView } from "interfaces";
import { formatCurrencyAmount } from "utils";
import styles from "styles/LotGridItem.module.css";

const LotGridItem = ({ lot, mojitoLotData, auctionSlug }: any) => {
  const startDate = mojitoLotData.startDate;
  const formattedStartDate =
    startDate &&
    momentTimeZone(startDate)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("MMM Do / H:mm:ss");

  const tagTextView = (bidView: IAuctionLotBidView) => {
    if (bidView.isPreSale)
      return (
        <>
          Bidding starts on <span>{formattedStartDate}</span>
        </>
      );
    if (bidView.isDuringSale)
      return (
        <>
          Current Biddding:{" "}
          <span>
            {formatCurrencyAmount(
              mojitoLotData.currentBid?.amount
                ? mojitoLotData.currentBid.amount
                : 0
            )}
          </span>
        </>
      );
    return (
      <span>Auction finished</span>
    )
  };

  return (
    <a href={`lots/${lot.slug}`} className={styles.lot}>
      <div className={styles.imageWrapper}>
        <Image
          objectFit={"cover"}
          layout={"fill"}
          quality={75}
          priority={true}
          draggable="false"
          className={styles.image}
          src={lot.imagesCollection.items[0].url + `?w=${400}&h=${400}`}
          alt="lot-image"
        />
      </div>
      <div className={styles.tag}>
        {tagTextView(mojitoLotData.bidView)}
      </div>
      <div className={styles.row}>
        <h2>{lot.title}</h2>
      </div>
      <p className={styles.id}>{`#${lot.lotId}`}</p>
      <p>
        {mojitoLotData.bidView.isPostSale && mojitoLotData.currentBid ? (
          <>
            Winner <span>{mojitoLotData.currentBid.marketplaceUser.username}</span>
          </>
        ) : (
          <>
            Created by <span>{lot.author.name}</span>
          </>
        )}
      </p>
    </a>
  );
};

export default LotGridItem;
