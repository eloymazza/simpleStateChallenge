import React from "react";
import styles from "./Card.module.css";

type Props = {
  children: React.ReactNode;
  customClass?: string;
};

const Card = ({ children, customClass }: Props) => {
  return (
    <section className={`${styles.card} ${customClass}`}>{children}</section>
  );
};

export default Card;
