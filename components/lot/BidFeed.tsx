import React from "react";
import { BidFeedItem } from "components";
import styles from "styles/BidFeed.module.css";

export const BidFeed = ({ bids, profile }: any) => {
  bids = bids?.map((bid: any) => {
    bid.isYou = profile?.me.id == bid.marketplaceUser.id;
    return bid;
  });

  const _youFirstBid = bids.findIndex((bid: any) => bid.isYou);
  if (_youFirstBid == 0) bids[0].holdBid = true;
  else if (_youFirstBid > 0) {
    bids[_youFirstBid].outbid = true;
    if (bids[0].amount == bids[_youFirstBid].amount) {
      bids[_youFirstBid].outbidinfo = true;
    }
  }

  return (
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
};
