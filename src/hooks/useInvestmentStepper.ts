import { useState } from "react";
import { InvestmentConfig } from "../components/InvestmentStepper";

export const CONFIGURATION_STEP = "CONFIGURATION";
export const SIMULATION_STEP = "SIMULATION";
export const PAYMENT_STEP = "PAYMENT";
export const STEPS = [CONFIGURATION_STEP, SIMULATION_STEP, PAYMENT_STEP];
export const MAX_STEP = STEPS.length - 1;

export const useInvestmentStepper = () => {
  const [stepNumber, setStepNumber] = useState(0);

  const stepName = STEPS[stepNumber];

  const goNextStep = () => {
    if (stepNumber === MAX_STEP) return;
    setStepNumber(stepNumber + 1);
  };

  const goPreviousStep = () => {
    if (stepName === CONFIGURATION_STEP) return CONFIGURATION_STEP;
    if (stepName === SIMULATION_STEP) {
      setStepNumber(stepNumber - 1);
      return SIMULATION_STEP;
    }
    if (stepName === PAYMENT_STEP) {
      resetStepper();
      return PAYMENT_STEP;
    }
    if (stepName === SIMULATION_STEP) {
      setStepNumber(stepNumber - 1);
      return SIMULATION_STEP;
    }
    return CONFIGURATION_STEP;
  };

  const resetStepper = () => {
    setStepNumber(0);
  };

  const isNextStepEnabled = ({
    type,
    currency,
    amount,
    simulationLoaded,
    file,
    termsAndconditionsAccepted
  }: InvestmentConfig) => {
    if (stepName === CONFIGURATION_STEP)
      return !!type && !!currency && !!amount;
    if (stepName === SIMULATION_STEP) return simulationLoaded;
    if (stepName === PAYMENT_STEP) return file && termsAndconditionsAccepted;
    return false;
  };

  return {
    step: stepName,
    goNextStep,
    goPreviousStep,
    isNextStepEnabled,
    resetStepper
  };
};
