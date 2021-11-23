import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "styles/Header.module.css";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const router = useRouter();
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
      {isAuthenticated ? (
        <button className={styles.button} onClick={() => logout({ returnTo: window.location.origin })}>logout</button>
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
    </nav>
  );
};

export default Header;
