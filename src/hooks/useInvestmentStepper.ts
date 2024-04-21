import { useState } from "react";
import { InvestmentConfig } from "../components/InvestmentStepper";

export const CONFIGURATION_STEP = "CONFIGURATION";
export const SIMULATION_STEP = "SIMULATION";
export const PAYMENT_STEP = "PAYMENT";
export const STEPS = [CONFIGURATION_STEP, SIMULATION_STEP, PAYMENT_STEP];

export const useInvestmentStepper = () => {
  const [stepNumber, setStepNumber] = useState(0);

  const stepName = STEPS[stepNumber];

  const goNextStep = () => {
    setStepNumber(stepNumber + 1);
  };

  const goPreviousStep = () => {
    if (stepNumber === 0) return;
    setStepNumber(stepNumber - 1);
  };

  const isNextStepEnabled = ({
    type,
    currency,
    ammount,
    simulationLoaded
  }: InvestmentConfig) => {
    if (stepName === CONFIGURATION_STEP)
      return !!type && !!currency && !!ammount;
    if (stepName === SIMULATION_STEP) return simulationLoaded;
    return false;
  };

  return {
    step: stepName,
    goNextStep,
    goPreviousStep,
    isNextStepEnabled
  };
};
