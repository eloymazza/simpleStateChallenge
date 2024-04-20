import style from "./Button.module.css";

type Props = {
  label: string;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  handleClick?: () => void;
  disabled?: boolean;
  testId?: string;
};

const Button = ({
  label,
  type,
  size = "medium",
  variant = "primary",
  disabled = false,
  handleClick,
  testId
}: Props) => {
  return (
    <button
      data-testid={testId}
      type={type}
      className={`${style.button} ${style[size]} ${style[variant]} ${
        disabled ? style.disabled : ""
      }`}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
