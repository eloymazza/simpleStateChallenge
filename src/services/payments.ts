import { API_URL } from "../utils/constants";
import { APIResponse } from "../utils/types";

export type PaymentResult = {
  bank: string;
  account_type: string;
  account_number: string;
  cuit: string;
  name: string;
  cbu: string;
};

export const getPayment = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/getPayment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data: APIResponse<PaymentResult> = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
