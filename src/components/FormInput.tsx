import { FC } from "react";

interface FormInputProps {
  email: string;
  isValidEmail: string;
  handleChangeEmail: (e: string) => void;
  handleCheckValue: () => void;
  handleResetValue: () => void;
}

const FormInput: FC<FormInputProps> = ({
  email,
  isValidEmail,
  handleCheckValue,
  handleChangeEmail,
  handleResetValue,
}) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeEmail(e.target.value)
        }
        onBlur={handleCheckValue}
        onFocus={handleResetValue}
      />
      {isValidEmail && email && (
        <div className="label">
          <span
            className="label-text-alt"
            style={{
              color: isValidEmail === "email is ok" ? "green" : "red",
            }}
          >
            {isValidEmail}
          </span>
        </div>
      )}
    </label>
  );
};

export default FormInput;
