import { useState } from "react";
import Button from "./UI/Button";
import Title from "./UI/Title";
import styles from "./InvestmentStepper.module.css";
import ConfigurationStep from "./steps/ConfigurationStep";
import {
  PAYMENT_STEP,
  SIMULATION_STEP,
  useInvestmentStepper
} from "../hooks/useInvestmentStepper";
import StepperBackButton from "./steps/StepperBackButton";
import SimulationStep from "./steps/SimulationStep";
import PaymentStep from "./steps/PaymentStep";

export type InvestmentConfig = {
  type: string;
  currency: string;
  ammount: string;
  simulationLoaded: boolean;
};

const InvestmentStepper = () => {
  const { step, isNextStepEnabled, goNextStep, goPreviousStep } =
    useInvestmentStepper();

  const [investementConfig, setInvestmentConfig] = useState<InvestmentConfig>({
    type: "",
    currency: "",
    ammount: "",
    simulationLoaded: false
  });

  const updateInvestmentConfig = (key: string, value: string | boolean) => {
    setInvestmentConfig({
      ...investementConfig,
      [key]: value
    });
  };

  const setSimulationLoaded = (value: boolean) => {
    setInvestmentConfig({
      ...investementConfig,
      simulationLoaded: value
    });
  };

  const stepEnabled = isNextStepEnabled(investementConfig);

  const handleContinue = () => {
    goNextStep();
  };

  return (
    <div className={styles.stepperContainer}>
      <StepperBackButton step={step} onClick={goPreviousStep} />
      <Title text='Nueva inversión' />
      {step !== PAYMENT_STEP && (
        <ConfigurationStep setConfig={updateInvestmentConfig} />
      )}
      {step === SIMULATION_STEP && (
        <SimulationStep
          {...investementConfig}
          setSimulationLoaded={setSimulationLoaded}
        />
      )}
      {step === PAYMENT_STEP && <PaymentStep />}
      <div className={styles.continueButtonContainer}>
        <Button
          label='Continuar'
          handleClick={handleContinue}
          disabled={!stepEnabled}
          size='large'
        />
      </div>
    </div>
  );
};

export default InvestmentStepper;
