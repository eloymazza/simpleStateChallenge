import { API_URL } from "../utils/constants";

export type InvestmentsTypeBody = {
  status: string;
  data: string[];
};

export const fetchInvestmentTypes = async (): Promise<InvestmentsTypeBody> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/getModels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error("Error: ", error);
    return { data: [], status: "error" };
  }
};
