import { useState } from "react";
import Button from "./UI/Button";
import Title from "./UI/Title";
import styles from "./InvestmentStepper.module.css";
import ConfigurationStep from "./steps/configurationStep/ConfigurationStep";
import {
  CONFIGURATION_STEP,
  PAYMENT_STEP,
  SIMULATION_STEP,
  useInvestmentStepper
} from "../hooks/useInvestmentStepper";
import StepperBackButton from "./steps/StepperBackButton";
import SimulationStep from "./steps/simulationStep/SimulationStep";
import PaymentStep from "./steps/paymentStep/PaymentStep";
import useModal from "../hooks/useModal";
import Modal from "./UI/Modal";
import InvestmentRegisteredModal from "./InvestmentRegisteredModal";
import useStoreInvestment from "../hooks/useStoreInvestment";

export type InvestmentConfig = {
  type: string;
  currency: string;
  amount: string;
  simulationLoaded: boolean;
  file: File | null;
  termsAndconditionsAccepted: boolean;
};

const InvestmentStepper = () => {
  const { step, isNextStepEnabled, goNextStep, goPreviousStep, resetStepper } =
    useInvestmentStepper();

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const defaultConfig: InvestmentConfig = {
    type: "",
    currency: "",
    amount: "",
    simulationLoaded: false,
    file: null,
    termsAndconditionsAccepted: false
  };

  const [investementConfig, setInvestmentConfig] = useState<InvestmentConfig>({
    ...defaultConfig
  });

  const { storing, storeInvestment } = useStoreInvestment();

  const updateInvestmentConfig = (
    key: string,
    value: string | boolean | null
  ) => {
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

  const handleFileLoad = (file: File | null) => {
    setInvestmentConfig({
      ...investementConfig,
      file
    });
  };

  const handleTermsAndConditionsChange = (accepted: boolean) => {
    setInvestmentConfig({
      ...investementConfig,
      termsAndconditionsAccepted: accepted
    });
  };

  const handleFinish = async () => {
    const { status } = await storeInvestment("file");
    if (status === "success") {
      handleOpenModal();
    } else {
      alert("Error al guardar la inversión");
    }
  };

  const stepEnabled = isNextStepEnabled(investementConfig);

  const handleContinue = () => {
    goNextStep();
  };

  const onCloseModal = () => {
    resetStepper();
    resetConfig();
    handleCloseModal();
  };

  const resetConfig = () => {
    setInvestmentConfig({
      ...defaultConfig
    });
  };

  const handleBack = () => {
    const stepName = goPreviousStep();
    if (stepName === SIMULATION_STEP) {
      updateInvestmentConfig("simulationLoaded", false);
    }
    if (stepName === PAYMENT_STEP) {
      setInvestmentConfig({
        ...investementConfig,
        file: null,
        termsAndconditionsAccepted: false
      });
    }
    if (stepName === CONFIGURATION_STEP) {
      resetConfig();
    }
  };

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.backButtonContainer}>
        <StepperBackButton step={step} onClick={handleBack} />
      </div>
      <div className={styles.titleContainer}>
        <Title text='Nueva inversión' />
      </div>
      {step !== PAYMENT_STEP && (
        <ConfigurationStep
          setConfig={updateInvestmentConfig}
          config={investementConfig}
          readonly={step !== CONFIGURATION_STEP}
        />
      )}
      {step === SIMULATION_STEP && (
        <SimulationStep
          {...investementConfig}
          setSimulationLoaded={setSimulationLoaded}
        />
      )}
      {step === PAYMENT_STEP && (
        <PaymentStep
          currency={investementConfig.currency}
          amount={investementConfig.amount}
          handleFileLoad={handleFileLoad}
          handleTermsAndConditionsChange={handleTermsAndConditionsChange}
        />
      )}
      <div className={styles.continueButtonContainer}>
        {step !== PAYMENT_STEP ? (
          <Button
            label='Continuar'
            handleClick={handleContinue}
            disabled={!stepEnabled}
            size='large'
            testId='continue-button'
          />
        ) : storing ? (
          <p>Guardando inversión...</p>
        ) : (
          <Button
            label={"Finalizar"}
            handleClick={handleFinish}
            disabled={!stepEnabled}
            size='large'
            testId='finish-button'
          />
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <InvestmentRegisteredModal onClose={onCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default InvestmentStepper;
