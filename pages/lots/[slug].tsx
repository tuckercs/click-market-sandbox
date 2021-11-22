/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import client from "api/apollo-client";
import { useAuth0 } from "@auth0/auth0-react";
import QUERY_CONTENTFUL from "api/queries/contentful.graphql";
import BidFeed from "components/BidFeed";
import styles from "styles/LotDetail.module.css";
import { bidIncrement } from "utils/bidIncrement";
import { formatCurrencyAmount } from "utils";
import BidConfirmModal from "components/BidConfirmModal";

const LotDetail: NextPage = ({ lot }: any) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.detailContainer}>
            <div className={styles.detailLeft}>
              <img
                className={styles.image}
                src={lot.imagesCollection.items[0].url}
                alt={lot.imagesCollection.items[0].title}
                width={612}
                height={588}
              />
            </div>

            <div className={styles.detailRight}>
              <span className={styles.currentBid}>Current bid: $30000</span>
              <p className={styles.collectionTitle}>Collection</p>
              <p className={styles.lotTitle}>{lot.title}</p>
              <p className={styles.lotDescription}>{lot.aboutLot}</p>
              <div className={styles.author}>
                <div className={styles.authorImage}>
                  <Image
                    className={styles.image}
                    src={lot.author.avatar.url}
                    alt={lot.author.avatar.title}
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <h3 className={styles.authorName}>{lot.author.name}</h3>
                  <p className={styles.lotDescription}>{lot.author.about}</p>
                </div>
              </div>
              {isAuthenticated ? (
                <button className={styles.button} onClick={() => setShowConfirmModal(true)}>BID NOW!</button>
              ) : (
                <button className={styles.button} onClick={() => loginWithRedirect()}>SIGN IN</button>
              )}
            </div>
          </div>
          <BidFeed lot={lot} />
          <BidConfirmModal handleClose={() => setShowConfirmModal(false)} show={showConfirmModal} lot={lot}/>
        </div>
      </main>
    </div>
  );
};

export default LotDetail;

export async function getServerSideProps({ params }: any) {
  const { data, error } = await client.query({
    query: QUERY_CONTENTFUL,
    variables: { slug: params.slug },
  });

  if (error) {
    return;
  }

  return {
    props: {
      lot: data.lotCollection.items[0],
    },
  };
}
