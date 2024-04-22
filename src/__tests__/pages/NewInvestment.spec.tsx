import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import NewInvestment from "../../pages/NewInvestment";
import { InvestmentsTypeBody } from "../../services/investmentsTypes";
import { ChangeEvent } from "react";
import { CurrenciesBody } from "../../services/currencies";

describe("NewInvestment", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the InvestmentStepper component", () => {
    render(<NewInvestment />);
    const investmentStepperElement = screen.getByTestId(
      "new-investment-section"
    );
    expect(investmentStepperElement).toBeDefined();
  });

  it("renders investment steps and can go trhought all steps", async () => {
    const mockInvestmentType: InvestmentsTypeBody = {
      status: "success",
      data: ["Retiro flex", "Renta mensual", "Renta final"]
    };

    const mockCurrenciesResult: CurrenciesBody = {
      status: "success",
      data: ["USD", "PEN", "EUR"]
    };

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockCurrenciesResult)
      } as Response);
    });

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockInvestmentType)
      } as Response);
    });

    type Props = {
      options: { label: string; value: string }[];
      onChange: (value: { label: string; value: string }) => void;
      testId: string;
    };

    vi.mock("react-select", () => {
      return {
        default: ({ options, onChange, testId }: Props) => {
          const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
            const opt = options.find(
              (option) => option.label === event.target.value
            );
            if (opt) {
              onChange(opt);
            }
          };

          return (
            <select data-testid={testId} onChange={handleChange}>
              {options.map((option) => (
                <option key={option.value}>{option.label}</option>
              ))}
            </select>
          );
        }
      };
    });

    render(<NewInvestment />);
    const investmentType = screen.getByTestId("investment-type");
    const currency = screen.getByTestId("currency");
    const amount = screen.getByTestId("amount");
    const continueButton: HTMLButtonElement =
      screen.getByTestId("continue-button");

    expect(continueButton.disabled).toBe(true);

    await waitFor(() => {
      fireEvent.change(investmentType, {
        target: { value: "Retiro flex" }
      });
      fireEvent.change(currency, {
        target: { value: "USD" }
      });
      fireEvent.change(amount, {
        target: { value: "1000" }
      });

      expect(screen.getByText("Retiro flex")).toBeDefined();
      expect(screen.getByText("USD")).toBeDefined();
      expect(continueButton.disabled).toBe(false);
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Total de la inversión:")).toBeDefined();
    });

    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(
        screen.getByText("Forma de pago: Transferencia bancaria")
      ).toBeDefined();
    });

    const checkbox: HTMLInputElement = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    const fileInput: HTMLInputElement = screen.getByTestId("file-input");

    await waitFor(() => {
      fireEvent.change(fileInput, {
        target: {
          files: [new File(["test"], "file.pdf", { type: "application/pdf" })]
        }
      });
    });

    const finishButton: HTMLButtonElement = screen.getByTestId("finish-button");
    expect(finishButton.disabled).toBe(false);

    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(screen.getByText("Ya registramos tu inversión")).toBeDefined();
    });
  });
});
