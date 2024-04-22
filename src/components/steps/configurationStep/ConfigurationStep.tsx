import Card from "../../UI/Card";
import CustomSelect from "../../UI/CustomSelect";
import NumberInput from "../../UI/NumberInput";
import styles from "./ConfigurationStep.module.css";
import { InvestmentConfig } from "../../InvestmentStepper";
import useCurrencies from "../../../hooks/useCurrencies";
import useInvestmentsTypes from "../../../hooks/useInvestmentsTypes";

type Props = {
  setConfig: (key: keyof InvestmentConfig, value: string) => void;
};

const ConfigurationStep = ({ setConfig }: Props) => {
  const { investmensTypesOptions, loading: loadingInvestmentsTypes } =
    useInvestmentsTypes();
  const { currenciesOptions, loading: loadingCurrencies } = useCurrencies();

  return (
    <Card>
      <div className={styles.controlGroup}>
        <div>
          <CustomSelect
            testId='investment-type'
            label='Tipo de Inversión*'
            options={investmensTypesOptions}
            onChange={(value: string) => setConfig("type", value)}
            loading={loadingInvestmentsTypes}
          />
          <p className={styles.subLabel}>
            <a href='/learn-more'>Ver más sobre tipos de inversión</a>
          </p>
        </div>
        <CustomSelect
          testId='currency'
          label='Moneda*'
          options={currenciesOptions}
          onChange={(value: string) => setConfig("currency", value)}
          loading={loadingCurrencies}
        />
        <NumberInput
          testId='amount'
          label='Monto a invertir*'
          onChange={(value) => setConfig("amount", value)}
          min={0}
        />
      </div>
    </Card>
  );
};

export default ConfigurationStep;
