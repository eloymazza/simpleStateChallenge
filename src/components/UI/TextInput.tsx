import { useState } from "react";
import style from "./TextInput.module.css";
import Icon from "./Icon";
import IconButton from "./IconButton";

type Props = {
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  testId?: string;
};

const TextInput = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  testId
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type !== "password" ? type : showPassword ? "text" : "password";

  return (
    <div className={style.container}>
      <label>{label}</label>
      {type === "password" && (
        <div className={style.iconContainer}>
          <IconButton onClick={togglePasswordVisibility}>
            {inputType === "text" ? (
              <Icon src='hide-password' alt='Hide password' />
            ) : (
              <Icon src='show-password' alt='Show password' size={30} />
            )}
          </IconButton>
        </div>
      )}
      <input
        data-testid={testId}
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
