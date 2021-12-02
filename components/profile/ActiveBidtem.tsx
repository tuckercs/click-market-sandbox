/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import styles from "styles/ActiveBidItem.module.css";

export const ActiveBidtem = ({ bidData, lotData }: any) => (
  <a href={`lots/${lotData?.slug}`} className={styles.lot}>
    <div className={styles.imageWrapper}>
      {lotData?.format === "image" && (
        <Image
          objectFit={"cover"}
          layout={"fill"}
          quality={75}
          priority={true}
          draggable="false"
          className={styles.image}
          src={lotData?.images[0] + `?w=${400}&h=${400}`}
          alt="lot-image"
        />
      )}
      {lotData?.format === "video" && (
        <video className={styles.video} width={432} src={lotData?.videos[0]} />
      )}
    </div>
    <div className={styles.row}>
      <h3>{lotData?.title}</h3>
    </div>
    <p className={styles.id}>{`#${lotData?.lotId}`}</p>
    <p>
      Created by <span>{lotData?.author.name}</span>
    </p>
  </a>
);
