import React from "react";
import styles from "styles/Button.module.css";

export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode}) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
