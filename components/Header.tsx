import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { config } from "constants/";
import { useMojitoMutation, useMojito } from "hooks";
import { EMojitoMutations, EMojitoQueries } from "state";
import styles from "styles/Header.module.css";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const router = useRouter();

  const [updateUserSettings] = useMojitoMutation<{
    userOrgId: string;
    username: string;
    avatar: string;
  }>(EMojitoMutations.updateUserOrgSettings);

  const { data: profile } = useMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

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
  }, [isAuthenticated, profile, profile?.me.userOrgs, updateUserSettings, user?.picture, user?.nickname]);

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
        <a>
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
            <button
              className={styles.button}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              LOG OUT
            </button>
          ) : (
            <button className={styles.button} onClick={login}>
              SIGN UP
              <div className={styles.icon}>
                <Image
                  src="/icons/twitter.svg"
                  alt="icon"
                  width={19}
                  height={15}
                />
              </div>
            </button>
          )}
        </>
      )}
    </nav>
  );
};

export default Header;
