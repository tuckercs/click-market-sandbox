import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import client from "api/apollo-client";
import QUERY_CONTENTFUL from "../../api/queries/contentful.graphql";
import styles from "styles/LotDetail.module.css";

const LotDetail: NextPage = ({ lot }) => (
  <div className={styles.container}>
    <Head>
      <title>Mojito</title>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <main className={styles.main}>
      <div className={styles.detailContainer}>
        <div className={styles.detailLeft}>
          <Image
            className={styles.image}
            src={lot.imagesCollection.items[0].url}
            alt={lot.imagesCollection.items[0].title}
            width={612}
            height={588}
          />
        </div>

        <div className={styles.detailRight}>
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
            <p className={styles.authorName}>{lot.author.name}</p>
          </div>
          <span className={styles.currentBid}>Current bid: $30000</span>
          <p className={styles.collectionTitle}>Collection</p>
          <p className={styles.lotTitle}>{lot.title}</p>
          <p className={styles.lotDescription}>{lot.aboutLot}</p>
          <button className={styles.button}>
              BID NOW!
          </button>
        </div>
      </div>
    </main>
  </div>
);

export default LotDetail;

export async function getServerSideProps({ params }) {
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
