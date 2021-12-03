import React from "react";
import momentTimeZone from "moment-timezone";
import { IAuctionLotBidView } from "interfaces";
import { formatCurrencyAmount } from "utils";
import styles from "styles/StatusTag.module.css";

export const StatusTag = ({ mojitoLotData }: any) => {
  const startDate = mojitoLotData.startDate;
  const formattedStartDate =
    startDate &&
    momentTimeZone(startDate)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("MMM Do / H:mm:ss");

  const tagTextView = (bidView: IAuctionLotBidView) => {
    if (bidView.isPreSale)
      return (
        <>
          Bidding starts on <span>{formattedStartDate}</span>
        </>
      );
    if (bidView.isDuringSale)
      return (
        <>
          Current bid:{" "}
          <span>
            {formatCurrencyAmount(
              mojitoLotData.currentBid?.amount
                ? mojitoLotData.currentBid.amount
                : 0
            )}
          </span>
        </>
      );
    return (
      <span>Auction finished</span>
    )
  };

  return <div className={styles.tag}>{tagTextView(mojitoLotData.bidView)}</div>;
};
