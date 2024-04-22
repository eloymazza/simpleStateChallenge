import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: Props) => {
  return createPortal(
    <section onClick={onClose} className={styles.backdrop}>
      <div onClick={(e) => e.stopPropagation()} content={styles.content}>
        {children}
      </div>
    </section>,
    document.body
  );
};

export default Modal;
