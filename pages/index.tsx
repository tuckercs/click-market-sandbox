import type { NextPage } from "next";
import Image from "next/image";
import LotGridItem from "components/LotGridItem";
import { useContentfulLots, useAuction, useCollection } from "hooks";
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const { lots } = useContentfulLots();
  const { slug } = useAuction();
  const { collection } = useCollection(slug, {
    pollInterval: 1500, // To discuss
  });

  const collectionLotsIds = collection?.items?.map((e: any) => e.lot.id) || [];
  const filteredLots = lots.filter((e) =>
    collectionLotsIds.includes(e.mojitoId)
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src="/images/brand-icon.png" alt="icon" width={24} height={8} />
        <h1 className={styles.title}>Metaverso NFTs</h1>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>

        <div className={styles.grid}>
          {collection?.items.map((item: any) => {
            const lot = filteredLots.find((lot) => lot.mojitoId === item.lot.id);
            return lot && lot?.sys?.publishedAt ? (
              <LotGridItem
                key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
                mojitoLotData={item.lot}
                lot={lot}
                auctionSlug={collection.slug}
              />
            ) : null;
          })}
          <div className={styles.dummyView} />
          <div className={styles.dummyView} />
        </div>
      </main>
    </div>
  );
};

export default Home;
