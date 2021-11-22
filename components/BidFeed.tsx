import React from "react";
import { useMojito } from "hooks";
import BidFeedItem from "components/BidFeedItem";
import { EMojitoQueries } from "state";
import styles from "styles/BidFeed.module.css";

const BidFeed = ({ lot }: any) => {
  const { data: mojitoLotData } = useMojito(
    EMojitoQueries.oneLot,
    {
      pollInterval: 2000,
      variables: {
        marketplaceAuctionLotId: lot.mojitoId,
      },
    }
  );

  return !!mojitoLotData?.getMarketplaceAuctionLot.bids.length ? (
    <div className={styles.container}>
      <h3 className={styles.title}>Bid feed</h3>
      <div className={styles.table}>
        {mojitoLotData.getMarketplaceAuctionLot.bids.map((item: any, index: number) => (
          <BidFeedItem item={item} isTop={index === 0} key={item.id} />
        ))}
        <div className={styles.overlay} />
      </div>
    </div>
  ) : null;
};

export default BidFeed;
