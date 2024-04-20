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
};

const CustomSelect = ({ label, options, onChange, loading }: Props) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <Select
        onChange={(option: Option | null) => {
          if (!option) return;
          onChange(option.value);
        }}
        options={options}
        isClearable={false}
        backspaceRemovesValue={true}
      />
    </div>
  );
};

export default CustomSelect;
