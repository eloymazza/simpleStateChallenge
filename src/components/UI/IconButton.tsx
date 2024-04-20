import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const IconButton = ({ children, onClick }: Props) => {
  return (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
