/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { StatusTag } from "components";
import { formatCurrencyAmount } from "utils";
import styles from "styles/LotGridItem.module.css";

export const LotGridItem = ({ lot, mojitoLotData }: any) => (
  <a href={`lots/${lot.slug}`} className={styles.lot}>
    <div className={styles.imageWrapper}>
      {lot.format === "image" && (
        <Image
          objectFit="cover"
          layout="fill"
          draggable="false"
          className={styles.image}
          src={lot.images[0]}
          alt="lot-image"
        />
      )}
      {lot.format === "video" && (
        <video className={styles.video} preload="none" poster={lot.preview}>
          <source src={lot.videos[0]} />
        </video>
      )}
    </div>
    <div className={styles.tagContainer}>
      <StatusTag mojitoLotData={mojitoLotData} />
    </div>
    <div className={styles.line}>
      <h2>{lot.title}</h2>
    </div>
    <div className={styles.row}>
      <div>
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
      </div>
      {mojitoLotData.bidView.isDuringSale && (
        <div className={styles.currentBid}>
          Current bid:
          <div>
            {formatCurrencyAmount(
              mojitoLotData.currentBid?.amount
                ? mojitoLotData.currentBid?.amount
                : 0
            )}
          </div>
        </div>
      )}
    </div>
  </a>
);
