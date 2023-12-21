import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  classes: string;
  handleButtonClick: () => void;
}

const Button = ({ children, classes, handleButtonClick }: ButtonProps) => {
  return (
    <button onClick={handleButtonClick} className={`btn mt-auto ${classes}`}>
      {children}
    </button>
  );
};

export default Button;
