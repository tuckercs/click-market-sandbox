/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import StatusTag from "./StatusTag";
import styles from "styles/LotGridItem.module.css";

const LotGridItem = ({ lot, mojitoLotData, auctionSlug }: any) => {
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
      <div className={styles.tagContainer}>
        <StatusTag mojitoLotData={mojitoLotData} />
      </div>
      <div className={styles.row}>
        <h2>{lot.title}</h2>
      </div>
      <p className={styles.id}>{`#${lot.lotId}`}</p>
      <p>
        {mojitoLotData.bidView.isPostSale && mojitoLotData.currentBid ? (
          <>
            Winner{" "}
            <span>{mojitoLotData.currentBid.marketplaceUser.username}</span>
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
