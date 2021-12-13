import React from "react";
import { BidFeedItem } from "components";
import styles from "styles/BidFeed.module.css";

export const BidFeed = ({ bids, profile }: any) => (
  <div className={styles.container}>
    <h3 className={styles.title}>Bid feed</h3>
    <div className={styles.table}>
      {bids.map((item: any, index: number) => (
        <BidFeedItem
          item={item}
          isTop={index === 0}
          key={item.id}
          userId={profile?.me.id}
        />
      ))}
    </div>
  </div>
);
