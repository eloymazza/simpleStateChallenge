import style from "./NumberInput.module.css";

type Props = {
  label: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  testId?: string;
  min?: number;
};

const NumberInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  testId,
  min = 0
}: Props) => {
  return (
    <div className={style.container}>
      <label>{label}</label>
      <input
        data-testid={testId}
        type={"number"}
        placeholder={placeholder}
        name={name}
        min={min}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default NumberInput;
