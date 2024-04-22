import styles from "./Spinner.module.css";

type Props = {
  text: string;
};

const Spinner = ({ text }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Spinner;
