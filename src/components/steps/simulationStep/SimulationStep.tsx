import { useEffect } from "react";
import useSimulateInvestment from "../../../hooks/useSimulateInvestment";
import Card from "../../UI/Card";
import styles from "./SimulationStep.module.css";
import Spinner from "../../UI/Spinner";

type Props = {
  currency: string;
  type: string;
  amount: string;
  setSimulationLoaded: (value: boolean) => void;
};

const SimulationStep = ({
  currency,
  amount,
  type,
  setSimulationLoaded
}: Props) => {
  const { simulationResult, loading, error } = useSimulateInvestment();

  useEffect(() => {
    if (!loading && !error && simulationResult) {
      setSimulationLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, simulationResult]);

  if (loading) {
    return <Spinner text='Simulando inversion...' />;
  }

  if (error) {
    return <div> Error</div>;
  }

  if (!simulationResult) {
    return null;
  }

  const { profitability, mont_term, parking, payment } = simulationResult!;

  const [parsedType] = type.split("(");

  const anualEarning = (profitability / 100) * Number(amount);

  return (
    <Card customClass={styles.simulationStepCard}>
      <div className={styles.container}>
        <div className={`${styles.row} ${styles.header}`}>
          <div>
            Total de la inversión:{" "}
            <span>
              {currency} ${amount}
            </span>
          </div>
          <div>
            Ganancia anual estimada:{" "}
            <span>
              {currency} ${(profitability / 100) * Number(amount)}
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div>
            Tipo de inversion: <span>{parsedType}</span>
          </div>
          <div>
            {" "}
            Tasa anual: <span>{profitability}% </span>
          </div>
        </div>
        <div className={styles.row}>
          <div>
            {" "}
            Tiempo de inversion: <span>{mont_term} </span> meses
          </div>
          <div>
            {" "}
            Podes retirarte: <span> {parking}</span>{" "}
          </div>
        </div>
        <div className={styles.row}>
          <div>
            Recibiras al final del plazo:{" "}
            <span>
              {currency} {Number(amount) + Number(anualEarning)} $
            </span>
          </div>
          <div>
            {" "}
            Cuando cobraras las ganancias: <span>{payment} </span>{" "}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationStep;
