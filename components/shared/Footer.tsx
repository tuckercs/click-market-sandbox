import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://www.metaver.so/health">
        <a className={styles.footerText}>Health and Safety Guidelines</a>
      </Link>
      <div className={styles.footerLogo}>
        <Image
          src="/images/metaverso-logo.svg"
          alt="logo"
          width={276}
          height={30}
        />
      </div>
    </footer>
  );
};
