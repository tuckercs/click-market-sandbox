import React, { useEffect, useState, useCallback } from "react";
import momentTimeZone from "moment-timezone";
import { IAuctionLotBidView } from "@interfaces";
import styles from "@styles/StatusTag.module.css";
import { useSubscription, gql } from "@apollo/client";

export const StatusTag = ({ mojitoLotData }: any) => {
  const [serverTime, setServerTime] = useState(momentTimeZone());
  const startDate = mojitoLotData.startDate;
  const endDate = momentTimeZone(mojitoLotData.endDate);
  const formattedStartDate =
    startDate &&
    momentTimeZone(startDate)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("MMM Do / H:mm:ss");

  const { loading, error, data } = useSubscription(
    gql`
      subscription TimeNotifier {
        timeNotifier {
          time
        }
      }
    `
  );

  useEffect(() => {
    if (loading) return;
    const serverTime = momentTimeZone(
      data?.timeNotifier?.time.split(".")[0].split(" ").join("T") + "Z"
    );
    setServerTime(serverTime);
  }, [loading, data?.timeNotifier?.time]);

  const tagTextView = (bidView: IAuctionLotBidView) => {
    if (bidView.isPreSale)
      return (
        <>
          Bidding starts on <span>{formattedStartDate}</span>
        </>
      );
    if (bidView.isDuringSale)
      return (
        <Countdown
          eventTime={endDate}
          serverTime={serverTime}
          interval={1000}
        />
      );
    return <span>Auction finished</span>;
  };

  return <div className={styles.tag}>{tagTextView(mojitoLotData.bidView)}</div>;
};

const calculateDuration = (
  eventTime: momentTimeZone.Moment,
  serverTime: momentTimeZone.Moment
) =>
  momentTimeZone.duration(
    (eventTime.unix() - serverTime.unix()) * 1000,
    "milliseconds"
  );

interface CountdownProps {
  eventTime: momentTimeZone.Moment;
  serverTime: momentTimeZone.Moment;
  interval: number;
}

function Countdown({ eventTime, serverTime, interval }: CountdownProps) {
  const [duration, setDuration] = useState(
    calculateDuration(eventTime, serverTime)
  );
  const timerCallback = useCallback(() => {
    setDuration(calculateDuration(eventTime, serverTime.add(1, "seconds")));
  }, [serverTime]);

  useEffect(() => {
    setInterval(timerCallback, interval);
  }, [serverTime]);

  return (
    <>
      Auction closes in:{" "}
      <span>
        {duration.days()
          ? `${duration.days().toString().padStart(2, "0")}:`
          : ""}
        {`${duration.hours().toString().padStart(2, "0")}:${duration
          .minutes()
          .toString()
          .padStart(2, "0")}:${duration.seconds().toString().padStart(2, "0")}`}
      </span>
    </>
  );
}
