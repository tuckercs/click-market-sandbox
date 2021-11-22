/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
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
      <div className={styles.imageWrapper}>
        <Image
          objectFit={"cover"}
          layout={"fill"}
          quality={75}
          priority={true}
          draggable="false"
          className={styles.image}
          src={lot.imagesCollection.items[0].url + `?w=${200}&h=${200}`}
          alt="lot-image"
        />
      </div>
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
