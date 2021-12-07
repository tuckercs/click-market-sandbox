/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { StatusTag } from "components";
import styles from "styles/LotGridItem.module.css";

export const LotGridItem = ({ lot, mojitoLotData, auctionSlug }: any) => (
  <a href={`lots/${lot.slug}`} className={styles.lot}>
    <div className={styles.imageWrapper}>
      {lot.format === "image" && (
        <Image
          objectFit={"cover"}
          layout={"fill"}
          quality={75}
          priority={true}
          draggable="false"
          className={styles.image}
          src={lot.images[0] + `?w=${400}&h=${400}`}
          alt="lot-image"
        />
      )}
      {lot.format === "video" && (
        <Image
          objectFit={"cover"}
          layout={"fill"}
          quality={75}
          priority={true}
          draggable="false"
          className={styles.image}
          src={lot.preview + `?w=${400}&h=${400}`}
          alt="lot-image"
        />
      )}
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
          <span>{mojitoLotData.currentBid.userOrganization.user.name}</span>
        </>
      ) : (
        <>
          Created by <span>{lot.author.name}</span>
        </>
      )}
    </p>
  </a>
);
