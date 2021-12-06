import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ActiveBidtem } from "components";
import { config } from "constants/";
import { useLazyMojito, useFetchAfterAuth } from "hooks";
import { EMojitoQueries } from "state";
import Content from "metaverso.content.json";
import styles from "styles/Profile.module.css";

const Profile: NextPage = () => {
  const { logout, user } = useAuth0();
  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  const { lots } = Content;

  if (!profile) return null;
  const activeBids = profile.me.activeBids;
  const userPictureBetterQuality = (user.picture or "").replace("_normal", "_400x400")
  return (
    <main className={styles.container}>
      {user && (
        <>
          <div className={styles.topContainer}>
            <div className={styles.user}>
              <div className={styles.image}>
                <Image
                  src={userPictureBetterQuality || "/images/profile-placeholder.svg"}
                  alt="user"
                  width={120}
                  height={120}
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  LOG OUT
                </Button>
                {/* <div className={styles.edit}>
            <Button onClick={() => {}}>
              EDIT
            </Button>
            </div> */}
              </div>
              <div className={styles.info}>
                <h3>{user.name}</h3>
                <div className={styles.score}>
                  Bidding score: {activeBids.length}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bids}>
            {!!activeBids.length ? (
              <>
                <h2>MY ACTIVE BIDS</h2>
                <div className={styles.grid}>
                  {activeBids.map((bid: any) => {
                    const lot = lots.find(
                      (item: any) =>
                        item.mojitoId === bid.marketplaceAuctionLot.id
                    );
                    return (
                      <ActiveBidtem
                        key={lot?.mojitoId}
                        bidData={bid}
                        lotData={lot}
                      />
                    );
                  })}
                  <div className={styles.dummyView} />
                  <div className={styles.dummyView} />
                </div>
              </>
            ) : (
              <div className={styles.placeholder}>
                <span>{"You don't have any bids going on now"}</span>
                <Link href="/">
                  <a>
                    <Button onClick={() => {}}>GET STARTED</Button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
