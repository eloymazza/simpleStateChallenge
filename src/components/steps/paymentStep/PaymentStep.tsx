import usePayments from "../../../hooks/useGetPayments";
import Card from "../../UI/Card";
import Subtitle from "../../UI/Subtitle";
import Tag from "../../UI/Tag";
import styles from "./PaymentStep.module.css";
import UploadPaymentCommitment from "./UploadPaymentCommitment";

type Props = {
  amount: string;
  currency: string;
  handleFileLoad: (value: boolean) => void;
};

const PaymentStep = ({ amount, currency, handleFileLoad }: Props) => {
  const { payments, loading, error } = usePayments();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error al cargar el metodo de pago</p>;
  }

  if (!payments) {
    return <p>No se encontraron datos de pago</p>;
  }

  const { bank, account_type, account_number, cuit, name, cbu } = payments;

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.paymentHeaderContainer}>
          <div>
            <span>Forma de pago: Transferencia bancaria</span>
          </div>
          <div>
            <Tag color='purple'>
              Monto a Pagar:{" "}
              <span>
                {" "}
                {amount} {currency}
              </span>
            </Tag>
          </div>
        </div>
        <Subtitle text='Datos para Transferencia' />
        <div className={styles.bankAccountData}>
          <div className={styles.row}>
            <div>
              Banco: <span>{bank}</span>
            </div>
            <div>
              CUIT: <span> {cuit} </span>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              Tipo de cuenta: <span> {account_type} </span>
            </div>
            <div>
              Numero de cuenta: <span>{account_number} </span>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              Razon social: <span>{name}</span>
            </div>
            <div>
              CBU: <span> {cbu} </span>
            </div>
          </div>
        </div>
        <Subtitle text='Adjuntar Comprobante de pago' />
        <UploadPaymentCommitment handleFileLoad={handleFileLoad} />
      </div>
    </Card>
  );
};

export default PaymentStep;
