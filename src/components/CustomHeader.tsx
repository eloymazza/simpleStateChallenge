import style from "./CustomHeader.module.css";

const CustomHeader = () => {
  return (
    <div className={style.customHeaderContainer}>
      <h2 className={style.customHeader}>Iniciar sesión</h2>
    </div>
  );
};

export default CustomHeader;
