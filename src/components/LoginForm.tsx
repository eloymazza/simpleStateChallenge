import React, { useEffect } from "react";
import TextInput from "./UI/TextInput";
import Button from "./UI/Button";
import styles from "./LoginForm.module.css";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "../constants";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const disabled = !email || !emailRegex.test(email) || !password;

  const { login, isLoggedIn } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES_PATHS.NEW_INVESTMENT);
    }
  }, [isLoggedIn, navigate]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(email, password);
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };
  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.formControls}>
        <TextInput
          testId='email-input'
          label='Email'
          type='email'
          onChange={handleChangeEmail}
        />
        <TextInput
          testId='password-input'
          label='Password'
          type='password'
          onChange={handleChangePassword}
        />
        <div className={styles.forgotPasswordLink}>
          <a href='/forgot-password'>¿Olvidaste tu contraseña?</a>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          testId='login-button'
          size='large'
          label='Ingresar'
          disabled={disabled}
          type='submit'
        />
      </div>
    </form>
  );
};

export default LoginForm;
