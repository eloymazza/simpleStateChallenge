// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Select from "react-select";
import styles from "./CustomSelect.module.css";

type Option = {
  label: string;
  value: string;
};

export type Options = Option[];

type Props = {
  label: string;
  options: Option[];
  onChange: (value: string) => void;
  loading?: boolean;
  testId?: string;
};

const CustomSelect = ({ label, options, onChange, testId }: Props) => {
  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      ":hover": {
        outline: "none",
        borderColor: "black"
      },
      border: "1px solid gray",
      boxShadow: "none",
      borderRadius: "var(--border-radius-medium)",
      cursor: "pointer"
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      padding: "0 var(--spacing-x3)"
    }),
    option: (baseStyles, { isSelected }) => ({
      ...baseStyles,
      margin: "var(--spacing-x2) 0",
      padding: "var(--spacing-x2) var(--spacing-x2)",
      borderRadius: "var(--border-radius-small)",
      "&:hover": {
        backgroundColor: isSelected
          ? "var(--element-color--primary)"
          : "var(--element-color--primary-hover)",
        cursor: "pointer"
      },
      backgroundColor: isSelected
        ? "var(--element-color--primary)"
        : "transparent"
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none"
    })
  };

  return (
    <div className={styles.container} data-testid={`${testId + "-container"}`}>
      <label>{label}</label>
      <Select
        testId={testId}
        onChange={(option: Option | null) => {
          if (!option) return;
          onChange(option.value);
        }}
        styles={customStyles}
        options={options}
        isClearable={false}
        backspaceRemovesValue={true}
        placeholder='Seleccionar'
      />
    </div>
  );
};

export default CustomSelect;
