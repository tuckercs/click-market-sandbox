import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "styles/Header.module.css";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className={styles.container}>
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
      {user ? (
        <a href="/api/auth/logout">
          <button className={styles.button}>logout</button>
        </a>
      ) : (
        <a href={`/api/auth/login?returnTo=${router.asPath}`}>
          <button className={styles.button}>
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
        </a>
      )}
    </div>
  );
};

export default Header;
