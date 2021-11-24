import React from "react";
import BidFeedItem from "components/BidFeedItem";
import styles from "styles/BidFeed.module.css";

const BidFeed = ({ bids }: any) => (
  <div className={styles.container}>
    <h3 className={styles.title}>Bid feed</h3>
    <div className={styles.table}>
      {bids.map((item: any, index: number) => (
        <BidFeedItem item={item} isTop={index === 0} key={item.id} />
      ))}
      <div className={styles.overlay} />
    </div>
  </div>
);

export default BidFeed;
