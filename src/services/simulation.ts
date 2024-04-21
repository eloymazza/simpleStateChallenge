import { API_URL } from "../utils/constants";
import { APIResponse } from "../utils/types";

export type SimulationResult = {
  amount: number;
  currency_id: number;
  mont_term: number;
  parking: string;
  payment: string;
  profitability: number;
  profitability_amount: number;
};

export const postSimulation = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/simulateInvestment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data: APIResponse<SimulationResult> = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
