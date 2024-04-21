import { CONFIGURATION_STEP } from "../../hooks/useInvestmentStepper";
import styles from "./StepperBackButton.module.css";

type Props = {
  step: string;
  onClick: () => void;
};

const StepperBackButton = ({ step, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.backButtonContainer} ${
        step === CONFIGURATION_STEP ? styles.hide : ""
      }`}
    >
      {"<"} <a className={styles.backButton}>Volver</a>
    </div>
  );
};

export default StepperBackButton;
