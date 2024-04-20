import { useEffect, useState } from "react";
import { fetchInvestmentTypes } from "../services/investmentsTypes";
import { InvestmentsTypeBody } from "../services/investmentsTypes";

const useInvestmentsTypes = () => {
  const [investmentsTypes, setInvestmentsTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const investmensTypesOptions =
    (!loading &&
      investmentsTypes &&
      investmentsTypes.map((investmentType) => ({
        label: investmentType,
        value: investmentType
      }))) ||
    [];

  useEffect(() => {
    setLoading(true);
    const getInvestmentTypes = async () => {
      const body: InvestmentsTypeBody = await fetchInvestmentTypes();
      if (body.status === "error") {
        setLoading(false);
        return;
      }
      const { data } = body;
      const currs = Object.values(data).map((key) => key);
      setInvestmentsTypes(currs);
      setLoading(false);
    };
    getInvestmentTypes();
  }, []);

  return {
    investmentsTypes,
    loading,
    investmensTypesOptions
  };
};

export default useInvestmentsTypes;
