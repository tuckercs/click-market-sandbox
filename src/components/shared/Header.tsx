import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@components";
import { config } from "@constants";
import { useMojitoMutation, useLazyMojito, useFetchAfterAuth } from "@hooks";
import { EMojitoMutations, EMojitoQueries } from "@state";
import styles from "@styles/Header.module.css";

export const Header = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();

  const [updateUserSettings] = useMojitoMutation<{
    userOrgId: string;
    username: string;
    avatar: string;
  }>(EMojitoMutations.updateUserOrgSettings);

  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  useEffect(() => {
    if (isAuthenticated && profile && !profile.me.userOrgs[0].username) {
      updateUserSettings({
        variables: {
          userOrgId: profile.me.userOrgs[0].id,
          username: user?.nickname,
          avatar: user?.picture,
        },
      });
    }
  }, [
    isAuthenticated,
    profile,
    profile?.me.userOrgs,
    updateUserSettings,
    user?.picture,
    user?.nickname,
  ]);

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };

  return (
    <nav className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <Image
            src="/images/metaverso-logo.svg"
            alt="logo"
            width={237}
            height={40}
          />
        </a>
      </Link>
      {!isLoading && (
        <>
          {isAuthenticated ? (
            <Link href="/profile">
              <a>
                <Image
                  src="/icons/profile.svg"
                  alt="profile"
                  width={26}
                  height={26}
                />
              </a>
            </Link>
          ) : (
            <div className={styles.button}>
              <Button onClick={login}>SIGN UP</Button>
            </div>
          )}
        </>
      )}
    </nav>
  );
};
