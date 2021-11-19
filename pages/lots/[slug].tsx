import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import client from "api/apollo-client";
import { useUser } from "@auth0/nextjs-auth0";
import QUERY_CONTENTFUL from "api/queries/contentful.graphql";
import BidFeed from "components/BidFeed";
import styles from "styles/LotDetail.module.css";

const LotDetail: NextPage = ({ lot }: any) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
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
              {user ? (
                <button className={styles.button}>BID NOW!</button>
              ) : (
                <a href={`/api/auth/login?returnTo=${router.asPath}`}>
                  <button className={styles.button}>SIGN IN</button>
                </a>
              )}
            </div>
          </div>
          <BidFeed />
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

  console.log(data)
  if (error) {
    console.log(error)
    return;
  }

  return {
    props: {
      lot: data.lotCollection.items[0],
    },
  };
}
