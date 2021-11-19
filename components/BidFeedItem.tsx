import React from "react";
import Image from "next/image";
import styles from "styles/BidFeedItem.module.css";
import { formatCurrencyAmount } from "utils";

const BidFeedItem = ({ item, isTop }) => {
  const avatarSize = isTop ? 96 : 51;
  return (
    <div
      className={styles.container}
      style={!isTop ? { borderTopWidth: 1 } : undefined}
    >
      <div className={styles.bidder}>
        <Image
          src={item.avatar}
          alt="avatar"
          width={avatarSize}
          height={avatarSize}
        />
        <span
          className={styles.name}
          style={
            isTop
              ? { fontFamily: "IBMPlexMono", fontSize: 24, fontWeight: 500 }
              : undefined
          }
        >
          {item.name}
        </span>
      </div>
      <span>{item.bidTime}</span>
      <span className={styles.bid} style={isTop ? { fontSize: 24 } : undefined}>
        {`30Ξ ${formatCurrencyAmount(item.bid)}`}
      </span>
    </div>
  );
};

export default BidFeedItem;
