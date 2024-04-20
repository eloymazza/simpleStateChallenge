import { API_URL } from "../constants";

export type CurrenciesBody = {
  status: string;
  data: string[];
};

export const fetchCurrencies = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/getCurrencies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data: CurrenciesBody = await response.json();
    return { data: data.data, status: data.status };
  } catch (error) {
    console.error("Error: ", error);
    return { data: [], status: "error" };
  }
};
