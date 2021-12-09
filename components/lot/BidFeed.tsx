import React from "react";
import { BidFeedItem } from "components";
import styles from "styles/BidFeed.module.css";

export const BidFeed = ({ bids, userId }: any) => {
  let _nextIndex = 1;
  while (bids[_nextIndex] !== undefined) {
    if (bids[_nextIndex - 1].amount === bids[_nextIndex].amount) {
      bids[_nextIndex].outbidinfo = "You don't hold the bid because you placed your responsive high bid after the user above.";
      bids[_nextIndex - 1].outbidinfo = "You hold the bid because you placed your responsive high bid before the user below.";
    }
    _nextIndex += 1;
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
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};
