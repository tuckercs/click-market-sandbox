import React from "react";
import { gql, useQuery } from "@apollo/client";
import BidFeedItem from "components/BidFeedItem";
import styles from "styles/BidFeed.module.css";

const items = [
  {
    id: 0,
    avatar: "/favicon.png",
    name: "John Doe",
    bidTime: "1 hour ago",
    bid: 100000,
  },
  {
    id: 1,
    avatar: "/favicon.png",
    name: "Roger Federer",
    bidTime: "1 hour ago",
    bid: 100000,
  },
  {
    id: 2,
    avatar: "/favicon.png",
    name: "Justine Henin",
    bidTime: "1 hour ago",
    bid: 100000,
  },
  {
    id: 3,
    avatar: "/favicon.png",
    name: "Andy Roddick",
    bidTime: "1 hour ago",
    bid: 100000,
  },
  {
    id: 4,
    avatar: "/favicon.png",
    name: "Andre Agassi",
    bidTime: "1 hour ago",
    bid: 100000,
  },
  {
    id: 5,
    avatar: "/favicon.png",
    name: "Pete Sampras",
    bidTime: "1 hour ago",
    bid: 100000,
  },
];

const BidFeed = () => {
  // TO DO
  // const { loading, error, data } = useQuery(, {
  //   variables: {},
  //   pollInterval: 500,
  // });

  return(
  <div className={styles.container}>
    <h3 className={styles.title}>Bid feed</h3>
    <div className={styles.table}>
      {items.slice(0, 5).map((item, index) => (
        <BidFeedItem item={item} isTop={index === 0} key={item.id} />
      ))}
      <div className={styles.overlay} />
    </div>
  </div>
);}

export default BidFeed;
