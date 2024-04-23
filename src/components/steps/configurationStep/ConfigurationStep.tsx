import Card from "../../UI/Card";
import CustomSelect from "../../UI/CustomSelect";
import NumberInput from "../../UI/NumberInput";
import styles from "./ConfigurationStep.module.css";
import { InvestmentConfig } from "../../InvestmentStepper";
import useCurrencies from "../../../hooks/useCurrencies";
import useInvestmentsTypes from "../../../hooks/useInvestmentsTypes";

type Props = {
  setConfig: (key: keyof InvestmentConfig, value: string) => void;
  readonly: boolean;
  config: InvestmentConfig;
};

const ConfigurationStep = ({ setConfig, readonly, config }: Props) => {
  const { investmensTypesOptions, loading: loadingInvestmentsTypes } =
    useInvestmentsTypes();
  const { currenciesOptions, loading: loadingCurrencies } = useCurrencies();

  return (
    <Card>
      <div className={styles.controlGroup}>
        <div>
          <CustomSelect
            value={config.type}
            testId='investment-type'
            label='Tipo de Inversión*'
            options={investmensTypesOptions}
            onChange={(value: string) => setConfig("type", value)}
            loading={loadingInvestmentsTypes}
            readonly={readonly}
          />
          <p className={styles.subLabel}>
            <a href='/learn-more'>Ver más sobre tipos de inversión</a>
          </p>
        </div>
        <CustomSelect
          value={config.currency}
          testId='currency'
          label='Moneda*'
          options={currenciesOptions}
          onChange={(value: string) => setConfig("currency", value)}
          loading={loadingCurrencies}
          readonly={readonly}
        />
        <NumberInput
          value={config.amount}
          testId='amount'
          label='Monto a invertir*'
          onChange={(value) => setConfig("amount", value)}
          min={0}
          readonly={readonly}
        />
      </div>
    </Card>
  );
};

export default ConfigurationStep;
