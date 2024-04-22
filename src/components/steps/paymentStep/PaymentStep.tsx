import usePayments from "../../../hooks/useGetPayments";
import Card from "../../UI/Card";
import Spinner from "../../UI/Spinner";
import Subtitle from "../../UI/Subtitle";
import Tag from "../../UI/Tag";
import styles from "./PaymentStep.module.css";
import TermsAndConditions from "./TermsAndConditions";
import UploadPaymentCommitment from "./UploadPaymentCommitment";

type Props = {
  amount: string;
  currency: string;
  handleFileLoad: (file: File | null) => void;
  handleTermsAndConditionsChange: (accepted: boolean) => void;
};

const PaymentStep = ({
  amount,
  currency,
  handleFileLoad,
  handleTermsAndConditionsChange
}: Props) => {
  const { payments, loading, error } = usePayments();

  if (loading) {
    return (
      <div className={styles.paymentMethodSkeleton}>
        <Spinner text='Cargando metodos de pago' />
      </div>
    );
  }
  if (error) {
    return <p>Ha ocurrido un error al cargar el metodo de pago</p>;
  }

  if (!payments) {
    return <p>No se encontraron datos de pago</p>;
  }

  const { bank, account_type, account_number, cuit, name, cbu } = payments;

  return (
    <>
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
      <TermsAndConditions
        onTermsAndConditionsChange={handleTermsAndConditionsChange}
      />
    </>
  );
};

export default PaymentStep;
