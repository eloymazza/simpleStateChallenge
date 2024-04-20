import { useState } from "react";
import Button from "./UI/Button";
import Title from "./UI/Title";
import styles from "./InvestmentStepper.module.css";
import ConfigurationStep from "./steps/ConfigurationStep";

export type InvestmentConfig = {
  investmentType: string;
  selectedCurrency: string;
  investedAmmount: string;
};

const InvestmentStepper = () => {
  const [investementConfig, setInvestmentConfig] = useState<InvestmentConfig>({
    investmentType: "",
    selectedCurrency: "",
    investedAmmount: ""
  });

  const updateInvestmentConfig = (key: string, value: string) => {
    setInvestmentConfig({
      ...investementConfig,
      [key]: value
    });
  };

  const { investmentType, selectedCurrency, investedAmmount } =
    investementConfig;
  const stepEnabled =
    !!investmentType && !!selectedCurrency && !!investedAmmount;

  return (
    <div className={styles.stepperContainer}>
      <div>Volver</div>
      <Title text='Nueva inversión' />
      <ConfigurationStep setConfig={updateInvestmentConfig} />
      <div className={styles.continueButtonContainer}>
        <Button label='Continuar' disabled={!stepEnabled} size='large' />
      </div>
    </div>
  );
};

export default InvestmentStepper;
