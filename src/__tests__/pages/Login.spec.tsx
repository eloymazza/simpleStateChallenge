import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Login from "../../pages/Login";
import { LoginResponse } from "../../types";
import { ROUTES_PATHS } from "../../constants";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate
  };
});

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

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

  it("redirects to new investment page when user is logged in", async () => {
    const mockResponse: LoginResponse = {
      token: "token"
    };

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      } as Response);
    });

    render(<Login />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId<HTMLButtonElement>("login-button");
    expect(loginButton.disabled).toBe(true);

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    expect(loginButton.disabled).toBe(false);
    fireEvent.click(loginButton);

    await vi.waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith(
        ROUTES_PATHS.NEW_INVESTMENT
      );
    });
  });
});
