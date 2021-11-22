/* eslint-disable @next/next/no-img-element */
import React from "react";
import momentTimeZone from "moment-timezone";
import { formatCurrencyAmount } from "utils";
import styles from "styles/LotGridItem.module.css";

const LotGridItem = ({ lot, mojitoLotData, auctionSlug }: any) => {
  const startDate = mojitoLotData.startDate;
  const formattedStartDate =
    startDate &&
    momentTimeZone(startDate)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("MMM Do / H:mm:ss");

  return (
    <a href={`lots/${lot.slug}`} className={styles.lot}>
      <img
        className={styles.image}
        src={lot.imagesCollection.items[0].url}
        alt="lot-image"
        width={432}
        height={415}
      />
      <div className={styles.tag}>
        {mojitoLotData.bidView.isPreSale ? (
          <>
            Bidding starts on <span>{formattedStartDate}</span>
          </>
        ) : (
          <>
            Current bid: <span>{formatCurrencyAmount(mojitoLotData.currentBid?.amount ? mojitoLotData.currentBid.amount : 0)}</span>
          </>
        )}
      </div>
      <div className={styles.row}>
        <h2>{lot.title}</h2>
      </div>
      <p className={styles.id}>{`#${lot.lotId}`}</p>
      <p>
        Created by <span>{lot.author.name}</span>
      </p>
    </a>
  );
};

export default LotGridItem;
