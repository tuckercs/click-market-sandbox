import React, { useRef, useLayoutEffect } from "react";
import { config } from 'constants/';
import { formatCurrencyAmount, generateAvatar, getTimeAgo } from "utils";
import styles from "styles/BidFeedItem.module.css";

const BidFeedItem = ({ item, isTop }: any) => {
  const {
    amount,
    createdAt,
    marketplaceUser: { avatar: avatarKey, username },
  } = item;
  const avatar = useRef<HTMLDivElement>(null);
  const timeAgo = getTimeAgo(createdAt);

  useLayoutEffect(() => {
    if (avatarKey && avatar.current) {
      avatar.current.innerHTML = generateAvatar(avatarKey);
    }
  }, [avatarKey, avatar]);

  return (
    <div
      className={styles.container}
      style={!isTop ? { borderTopWidth: 1 } : undefined}
    >
      <div className={styles.bidder}>
        <div className={styles.avatar} ref={avatar} style={isTop ? { width: 96, height: 96 } : undefined} />
        <span
          className={styles.name}
          style={
            isTop
              ? { fontFamily: "IBMPlexMono", fontSize: 24, fontWeight: 500 }
              : undefined
          }
        >
          {username}
        </span>
      </div>
      <span>{timeAgo}</span>
      <span className={styles.bid} style={isTop ? { fontSize: 24 } : undefined}>
<<<<<<< HEAD
        {amount / config.ETH_VALUE_MULTIPLIER}&#926; {formatCurrencyAmount(amount)}
=======
        {amount / parseInt(config.ETH_VALUE_MULTIPLIER)}&#926; {formatCurrencyAmount(amount)}
>>>>>>> d7604ad64aee9c04adf80f0195b6bce834d0b96e
      </span>
    </div>
  );
};

export default BidFeedItem;
