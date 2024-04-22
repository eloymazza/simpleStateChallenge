import { useState } from "react";
import { postInvestment } from "../services/storeInvestment";

type StoreResponse = {
  status: "success" | "error";
  message: string;
};

const useStoreInvestment = () => {
  const [storing, setStoring] = useState(false);
  const [storingError, setError] = useState(false);

  // File: 'string' is a mock parameter of a real file
  const storeInvestment = async (file: string): Promise<StoreResponse> => {
    setStoring(true);
    try {
      const response = await postInvestment(file);
      if (response?.status !== "success") {
        setError(true);
        return { status: "error", message: "Failed to store investment" };
      }
      return {
        status: "success",
        message: response.data || "Data stored sucessfully"
      };
    } catch (error) {
      console.error("Error: ", error);
      setError(true);
    } finally {
      setStoring(false);
    }
    return { status: "error", message: "Failed to store investment" };
  };

  return {
    storeInvestment,
    storing,
    storingError
  };
};

export default useStoreInvestment;
