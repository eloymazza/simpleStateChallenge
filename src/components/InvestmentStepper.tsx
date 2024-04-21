import { useState } from "react";
import Button from "./UI/Button";
import Title from "./UI/Title";
import styles from "./InvestmentStepper.module.css";
import ConfigurationStep from "./steps/configurationStep/ConfigurationStep";
import {
  PAYMENT_STEP,
  SIMULATION_STEP,
  useInvestmentStepper
} from "../hooks/useInvestmentStepper";
import StepperBackButton from "./steps/StepperBackButton";
import SimulationStep from "./steps/simulationStep/SimulationStep";
import PaymentStep from "./steps/paymentStep/PaymentStep";
import TermsAndConditions from "./steps/paymentStep/TermsAndConditions";

export type InvestmentConfig = {
  type: string;
  currency: string;
  amount: string;
  simulationLoaded: boolean;
  fileLoaded: boolean;
  termsAndconditionsAccepted: boolean;
};

const InvestmentStepper = () => {
  const { step, isNextStepEnabled, goNextStep, goPreviousStep } =
    useInvestmentStepper();

  const [investementConfig, setInvestmentConfig] = useState<InvestmentConfig>({
    type: "",
    currency: "",
    amount: "",
    simulationLoaded: false,
    fileLoaded: false,
    termsAndconditionsAccepted: false
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

  const handleFileLoad = (loaded: boolean) => {
    setInvestmentConfig({
      ...investementConfig,
      fileLoaded: loaded
    });
  };

  const handleTermsAndConditionsChange = (accepted: boolean) => {
    setInvestmentConfig({
      ...investementConfig,
      termsAndconditionsAccepted: accepted
    });
  };

  const handleFinish = () => {
    alert("Inversión realizada con éxito");
  };

  const stepEnabled = isNextStepEnabled(investementConfig);

  const handleContinue = () => {
    goNextStep();
  };

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.backButtonContainer}>
        <StepperBackButton step={step} onClick={goPreviousStep} />
      </div>
      <div className={styles.titleContainer}>
        <Title text='Nueva inversión' />
      </div>
      {step !== PAYMENT_STEP && (
        <ConfigurationStep setConfig={updateInvestmentConfig} />
      )}
      {step === SIMULATION_STEP && (
        <SimulationStep
          {...investementConfig}
          setSimulationLoaded={setSimulationLoaded}
        />
      )}
      {step === PAYMENT_STEP && (
        <>
          <PaymentStep
            currency={investementConfig.currency}
            amount={investementConfig.amount}
            handleFileLoad={handleFileLoad}
          />
          <TermsAndConditions
            onTermsAndConditionsChange={handleTermsAndConditionsChange}
          />
        </>
      )}
      <div className={styles.continueButtonContainer}>
        {step !== PAYMENT_STEP ? (
          <Button
            label='Continuar'
            handleClick={handleContinue}
            disabled={!stepEnabled}
            size='large'
          />
        ) : (
          <Button
            label={"Finalizar"}
            handleClick={handleFinish}
            disabled={!stepEnabled}
            size='large'
          />
        )}
      </div>
    </div>
  );
};

export default InvestmentStepper;
