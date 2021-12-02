import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { config } from "constants/";
import { formatCurrencyAmount, generateAvatar, getTimeAgo } from "utils";
import styles from "styles/BidFeedItem.module.css";

const BidFeedItem = ({ item, isTop, userId }: any) => {
  const {
    amount,
    createdAt,
    marketplaceUser: { avatar, username, id },
    userOrganization: {
      user: { name },
    },
  } = item;
  // const avatar = useRef<HTMLDivElement>(null);
  const timeAgo = getTimeAgo(createdAt);

  // useLayoutEffect(() => {
  //   if (avatarKey && avatar.current) {
  //     avatar.current.innerHTML = generateAvatar(avatarKey);
  //   }
  // }, [avatarKey, avatar]);

  return (
    <div
      className={styles.container}
      style={!isTop ? { borderTopWidth: 1 } : undefined}
    >
      <div className={styles.bidder}>
        {/* <div
          className={styles.avatar}
          ref={avatar}
          style={isTop ? { width: 96, height: 96 } : undefined}
        /> */}
        <Image
          className={styles.avatar}
          src={avatar || "/images/profile-placeholder.svg"}
          alt="avatar"
          width={isTop ? 96 : 51}
          height={isTop ? 96 : 51}
        />
        <span
          className={styles.name}
          style={
            isTop
              ? { fontFamily: "IBMPlexMono", fontSize: 24, fontWeight: 500 }
              : undefined
          }
        >
          {id === userId ? "You" : username || name}
        </span>
      </div>
      <span>{timeAgo}</span>
      <span className={styles.bid} style={isTop ? { fontSize: 24 } : undefined}>
        {amount / config.ETH_VALUE_MULTIPLIER}&#926;{" "}
        {formatCurrencyAmount(amount)}
      </span>
    </div>
  );
};

export default BidFeedItem;
