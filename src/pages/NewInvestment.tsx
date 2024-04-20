import InvestmentStepper from "../components/InvestmentStepper";
import styles from "./NewInvestment.module.css";

const NewInvestment = () => {
  return (
    <section className={styles.container}>
      <InvestmentStepper />
    </section>
  );
};

export default NewInvestment;
