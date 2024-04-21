import { useEffect, useState } from "react";
import { SimulationResult, postSimulation } from "../services/simulation";
import { Optional } from "../utils/types";

const useSimulateInvestment = () => {
  const [simulationResult, setSimulationResult] =
    useState<Optional<SimulationResult>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const simulateInvestment = async () => {
      setLoading(true);
      try {
        const response = await postSimulation();
        if (response?.status !== "success") {
          setError(true);
          return;
        }
        setSimulationResult(response.data);
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    simulateInvestment();
  }, []);

  return {
    simulationResult,
    loading,
    error
  };
};

export default useSimulateInvestment;
