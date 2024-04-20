import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Login from "../../pages/Login";

describe("Login Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders Login page", () => {
    render(<Login />);
    screen.getByText("Iniciar sesión");
    screen.getByText("Email");
    screen.getByText("Password");
    screen.getByText("¿Olvidaste tu contraseña?");
    const companyLogo = screen.getByTestId("company-logo");
    expect(companyLogo.tagName).toBe("svg");
    screen.getByText("¿Ya tienes cuenta?");
    const initSessionLink = screen.getByText("inicia sesión");
    expect(initSessionLink.tagName).toBe("A");
  });

  it("disable render button if email or password are invalid", () => {
    render(<Login />);
    const loginButton: HTMLButtonElement = screen.getByTestId("login-button");
    expect(loginButton.disabled).toBe(true);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    // login button should be still disabled because "test" is an invalid email
    expect(loginButton.disabled).toBe(true);
  });

  it("enable render button if email and password are valid", () => {
    render(<Login />);
    const loginButton = screen.getByTestId<HTMLButtonElement>("login-button");
    expect(loginButton.disabled).toBe(true);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    expect(loginButton.disabled).toBe(false);
  });
});
