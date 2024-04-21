import Card from "../../UI/Card";
import Subtitle from "../../UI/Subtitle";
import Tag from "../../UI/Tag";
import styles from "./PaymentStep.module.css";
import UploadPaymentCommitment from "./UploadPaymentCommitment";

const PaymentStep = () => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.paymentHeaderContainer}>
          <div>
            <span>Forma de pago: Transferencia bancaria</span>
          </div>
          <div>
            <Tag color='purple'>
              Monto a Pagar: <span> 100 USD</span>
            </Tag>
          </div>
        </div>
        <Subtitle text='Datos para Transferencia' />
        <div className={styles.bankAccountData}>
          <div className={styles.row}>
            <div>
              Banco: <span>Supervielle</span>
            </div>
            <div>
              CUIT: <span> 30-71661771-4 </span>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              Tipo de cuenta: <span> Cuenta corriente USD: </span>
            </div>
            <div>
              Numero de cuenta: <span>03958711-001 </span>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              Razon social: <span>Fideicomiso Simplestate</span>
            </div>
            <div>
              CBU: <span>0270055740039587110015 </span>
            </div>
          </div>
        </div>
        <Subtitle text='Adjuntar Comprobante de pago' />
        <UploadPaymentCommitment />
      </div>
    </Card>
  );
};

export default PaymentStep;
