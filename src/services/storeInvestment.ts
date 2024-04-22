import { API_URL } from "../utils/constants";
import { APIResponse } from "../utils/types";

export type StoreResult = string;

export const postInvestment = async (file: string) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("receipt", file);
    const response = await fetch(`${API_URL}/storeInvestment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data: APIResponse<StoreResult> = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
