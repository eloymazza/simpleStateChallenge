import React from "react";
import styles from "./Card.module.css";

type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
