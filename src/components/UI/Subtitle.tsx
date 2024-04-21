import styles from "./Subtitle.module.css";

type Props = {
  text: string;
};

const Subtitle = ({ text }: Props) => {
  return <h3 className={styles.Subtitle}>{text}</h3>;
};

export default Subtitle;
