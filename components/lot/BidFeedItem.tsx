import React, { useState } from "react";
import Image from "next/image";
import { config } from "constants/";
import { formatCurrencyAmount, getTimeAgo } from "utils";
import styles from "styles/BidFeedItem.module.css";

export const BidFeedItem = ({ item, isTop, userId }: any) => {
  const [showMessage, setShowMessage] = useState(false);
  const {
    amount,
    createdAt,
    marketplaceUser: { avatar, username, id },
    userOrganization: {
      user: { name },
    },
    outbidinfo,
  } = item;
  // const avatar = useRef<HTMLDivElement>(null);
  const timeAgo = getTimeAgo(createdAt);
  const avatarBetterQuality = avatar?.replace("_normal", "_400x400");
  // useLayoutEffect(() => {
  //   if (avatarKey && avatar.current) {
  //     avatar.current.innerHTML = generateAvatar(avatarKey);
  //   }
  // }, [avatarKey, avatar]);
  const onShowMessage = () => {
    if (!showMessage) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }
  };

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
          src={avatarBetterQuality || "/images/profile-placeholder.svg"}
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
        <div className={styles.warningContainer}>
          {outbidinfo && (
            <span className={styles.warning} onClick={onShowMessage}>
              ⚠️
            </span>
          )}
          {showMessage && (
            <>
              <div className={styles.arrow} />
              <div className={styles.warningMessage}>
                {
                  "You don't hold the leading bid because you placed your responsive high bid after the leading user."
                }
              </div>
            </>
          )}
        </div>
      </div>
      <span>{timeAgo}</span>
      <span className={styles.bid} style={isTop ? { fontSize: 24 } : undefined}>
        {+(amount / config.ETH_VALUE_MULTIPLIER).toFixed(5)}&#926;{" "}
        {formatCurrencyAmount(amount)}
      </span>
    </div>
  );
};
