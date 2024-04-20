import { useEffect, useState } from "react";
import { CurrenciesBody, fetchCurrencies } from "../services/currencies";

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const currenciesOptions =
    (!loading &&
      currencies &&
      currencies.map((currency) => ({
        label: currency,
        value: currency
      }))) ||
    [];

  useEffect(() => {
    setLoading(true);
    const getCurrencies = async () => {
      const response: CurrenciesBody = await fetchCurrencies();
      if (response.status === "error") {
        setLoading(false);
        return;
      }
      const { data } = response;
      const currs = Object.values(data).map((key) => key);
      setCurrencies(currs);
      setLoading(false);
    };
    getCurrencies();
  }, []);

  return {
    currencies,
    loading,
    currenciesOptions
  };
};

export default useCurrencies;
