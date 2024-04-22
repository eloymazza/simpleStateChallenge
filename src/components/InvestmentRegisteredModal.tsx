import styles from "./InvestmentRegisteredModal.module.css";
import Button from "./UI/Button";
import Icon from "./UI/Icon";
import IconButton from "./UI/IconButton";
import Subtitle from "./UI/Subtitle";

type Props = {
  onClose: () => void;
};

const InvestmentRegisteredModal = ({ onClose }: Props) => {
  const handleSeeMovements = () => {
    alert("Aun no implementado");
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeButton}>
        <IconButton onClick={onClose}>
          <Icon src='close' size={10} />
        </IconButton>
      </div>
      <div className={styles.image}>
        <Icon src='congratulations' size={70} />
      </div>
      <Subtitle text='Ya registramos tu inversión' />
      <p>
        Nuestro equipo estará validando el pago. <br />
        En unos minutos, podrás ver el estado de la inversión en tus
        movimientos.
      </p>
      <div className={styles.controls}>
        <Button
          handleClick={onClose}
          label='Salir'
          variant='secondary'
          size='large'
        />
        <Button handleClick={handleSeeMovements} label='Ver movimiento' />
      </div>
    </div>
  );
};

export default InvestmentRegisteredModal;
