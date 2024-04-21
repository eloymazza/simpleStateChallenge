import styles from "./TermsAndConditions.module.css";

type Props = {
  onTermsAndConditionsChange: (value: boolean) => void;
};

const TermsAndConditions = ({ onTermsAndConditionsChange }: Props) => {
  return (
    <div className={styles.container}>
      <input
        type='checkbox'
        id='termsAndConditions'
        onChange={(e) => onTermsAndConditionsChange(e.target.checked)}
      />
      <label htmlFor='termsAndConditions'>
        Leí y acepto{" "}
        <a href='/terms-and-conditions'> Términos y condiciones*</a>
      </label>
    </div>
  );
};

export default TermsAndConditions;
