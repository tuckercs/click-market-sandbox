import React from "react";
import Image from "next/image";
import styles from "styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="/" className={styles.footerText}>
        Health and Safety Guidelines
      </a>
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
