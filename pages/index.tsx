import type { NextPage } from "next";
import Image from "next/image";
import { LotGridItem } from "components";
import { useContentfulLots, useAuction, useCollection } from "hooks";
import styles from "styles/Home.module.css";
import Content from 'metaverso.content.prod.json';

const Home: NextPage = () => {
  const { lots } = Content
  const { collection } = useCollection("metaverso", { // TODO: Remove hardcoding
    pollInterval: 1500,
  });

  const collectionLotsIds = collection?.items?.map((e: any) => e.lot.id) || [];
  let filteredLots = lots.filter((e) =>
    collectionLotsIds.includes(e.mojitoId)
  );

  return (
    <main className={styles.main}>
      <Image src="/images/brand-icon.png" alt="icon" width={24} height={8} />
      <h1 className={styles.title}>Metaverso NFTs</h1>

      <p className={styles.description}>
        {`Puerto Rico's home in the metaverse`}
      </p>

      <p className={styles.descriptionTitle}>
        Dec 7, 2021 Museo de Arte de Puerto Rico
      </p>

      <p className={styles.subtitle}>
        metaver.so
      </p>

      <div className={styles.grid}>
        {
          filteredLots.map(lot => {
            const item = collection?.items.find((item: any) => item.lot.id === lot.mojitoId)
            return lot ? (
              <LotGridItem
                key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
                mojitoLotData={item.lot}
                lot={lot}
                auctionSlug={collection.slug}
              />
            ) : null;
          })
        }
        {/* {collection?.items.map((item: any) => {
            const lot = filteredLots.find((lot) => lot.mojitoId === item.lot.id);
            return lot ? (
              <LotGridItem
                key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
                mojitoLotData={item.lot}
                lot={lot}
                auctionSlug={collection.slug}
              />
            ) : null;
          })} */}
        <div className={styles.dummyView} />
        <div className={styles.dummyView} />
      </div>
    </main>
  );
};

export default Home;
