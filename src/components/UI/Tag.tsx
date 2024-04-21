import React from "react";
import styles from "./Tag.module.css";

type Props = {
  color:
    | "purple"
    | "green"
    | "lightgreen"
    | "blue"
    | "red"
    | "yellow"
    | "gray"
    | "orange";
  children: React.ReactNode;
  size?: "small" | "medium";
  radius?: "small" | "medium";
  clearable?: boolean;
};

const Tag = ({
  children,
  color,
  size = "medium",
  radius = "medium",
  clearable = false
}: Props) => {
  return (
    <div
      className={`${styles.container} ${styles[color]} ${styles[size]} ${
        styles["radius" + radius]
      }`}
    >
      {clearable && <span>x</span>}
      {children}
    </div>
  );
};

export default Tag;
