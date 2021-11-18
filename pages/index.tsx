import type { NextPage } from "next";
import Image from "next/image";
import client from "api/apollo-client";
import QUERY_CONTENTFUL from "api/queries/contentful.graphql";
import styles from "styles/Home.module.css";

const Home: NextPage = ({ lots }) => (
  <div className={styles.container}>
    <main className={styles.main}>
      <Image src="/images/brand-icon.png" alt="icon" width={24} height={8} />
      <h1 className={styles.title}>Metaverso NFTs</h1>

      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>

      <div className={styles.grid}>
        {lots.map((lot, index: number) => (
          <a
            href={`lots/${lot.slug}`}
            className={styles.lot}
            key={`${lot.id}-${index}`}
          >
            <Image
              className={styles.image}
              src={lot.imagesCollection.items[0].url}
              alt="lot-image"
              width={432}
              height={415}
            />
            <div className={styles.tag}>State tag</div>
            <div className={styles.row}>
              <h2>{lot.title}</h2>
            </div>
            <p>Collection name</p>
            <p>
              Created by <span>{lot.author.name}</span>
            </p>
          </a>
        ))}
      </div>
    </main>
  </div>
);

export default Home;

export async function getServerSideProps() {
  const { data } = await client.query({ query: QUERY_CONTENTFUL });
  return {
    props: {
      lots: data.lotCollection.items
    },
  };
}
