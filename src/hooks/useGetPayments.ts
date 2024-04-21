import { useEffect, useState } from "react";
import { PaymentResult, getPayment } from "../services/payments";
import { Optional } from "../utils/types";

const usePayments = () => {
  const [payments, setPayments] = useState<Optional<PaymentResult>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPaymentsData = async () => {
      setLoading(true);
      try {
        const response = await getPayment();
        if (response?.status !== "success") {
          setError(true);
          return;
        }
        setPayments(response.data);
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPaymentsData();
  }, []);

  return {
    payments,
    loading,
    error
  };
};

export default usePayments;
