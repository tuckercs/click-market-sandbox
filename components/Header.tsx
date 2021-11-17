import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Header.module.css";

const Header = () => (
  <div className={styles.container}>
    <Link href="/">
      <a><Image src="/images/metaverso-logo.svg" alt="logo" width={237} height={40} /></a>
    </Link>
    <button className={styles.button}>
      SIGN UP
      <div className={styles.icon}>
        <Image src="/icons/twitter.svg" alt="icon" width={19} height={15} />
      </div>
    </button>
  </div>
)

export default Header;
