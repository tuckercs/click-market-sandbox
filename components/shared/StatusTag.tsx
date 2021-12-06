import React, { useEffect, useState } from "react";
import momentTimeZone from "moment-timezone";
import { IAuctionLotBidView } from "interfaces";
import { formatCurrencyAmount } from "utils";
import styles from "styles/StatusTag.module.css";

export const StatusTag = ({ mojitoLotData }: any) => {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const startDate = mojitoLotData.startDate;
  const endDate = new Date(mojitoLotData.endDate);
  const formattedStartDate =
    startDate &&
    momentTimeZone(startDate)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("MMM Do / H:mm:ss");

    useEffect(()=>{
      let interval = setInterval(() => {
          const now = new Date().getTime();

          const distance = endDate.valueOf() - now.valueOf();

          // Time calculations for days, hours, minutes and seconds
          const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
          const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

          setDays(days);
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds);

          if (distance < 0) {
            clearInterval(interval);
          }

          }, 1000)

          return ()=> {
              clearInterval(interval);
            };
      });

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
          Auction closes in:{" "}
          <span>
            {days != "00" ? `${days}:` : ""}{`${hours}:${minutes}:${seconds}`}
          </span>
        </>
      );
    return (
      <span>Auction finished</span>
    )
  };

  return <div className={styles.tag}>{tagTextView(mojitoLotData.bidView)}</div>;
};
