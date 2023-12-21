import { useEffect, useRef, useState } from "react";
import { Route, Switch, useHistory } from "react-router";

import FormInput from "../components/FormInput";
import FormCheckbox from "../components/FormCheckbox";

function LoginFirstPage() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const history = useHistory();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail !== null) {
      setEmail(storedEmail);
      setIsValidEmail("email is ok");
    }
  }, []);

  useEffect(() => {
    if (isValidEmail === "email is ok") {
      sessionStorage.setItem("email", email);
    }
  }, [isValidEmail, email]);

  useEffect(() => {
    if (timer === 500) {
      history.push("/login/step-2");
    }
  }, [timer]);

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleResetValue = () => {
    setIsValidEmail("");
  };

  // Валидацию не стал делать через regEx, чтобы сделать обширный ответ по ошибкам
  const handleCheckValue = () => {
    const [localPart, domainPart] = email.split("@");

    if (!email.includes("@")) {
      setIsValidEmail("@ required");
      return;
    }

    if (
      localPart.length === 0 ||
      localPart.charAt(0) === "." ||
      localPart.charAt(localPart.length - 1) === "."
    ) {
      setIsValidEmail("wrong local part");
      return;
    }

    if (!domainPart || email.indexOf("@") === -1) {
      setIsValidEmail("wrong domain");
      return;
    }

    const dotIndex = domainPart.indexOf(".");
    if (
      dotIndex === -1 ||
      dotIndex === 0 ||
      dotIndex === domainPart.length - 1
    ) {
      setIsValidEmail(" wrong domain");
      return;
    }

    setIsValidEmail("email is ok");
  };

  const handleOnMouseDown = () => {
    const intervalUp = setInterval(() => {
      setTimer((prevTimer) => Math.min(prevTimer + 50, 500));
    }, 50);
    timerIntervalRef.current = intervalUp;
  };

  const handleOnMouseUp = () => {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
    }

    const intervalDown = setInterval(() => {
      setTimer((prevTimer) => Math.max(0, prevTimer - 50));
    }, 50);
    timerIntervalRef.current = intervalDown;
  };
  if (timer === 0 && timerIntervalRef.current !== null) {
    window.clearInterval(timerIntervalRef.current);
  }

  return (
    <>
      <FormInput
        email={email}
        isValidEmail={isValidEmail}
        handleCheckValue={handleCheckValue}
        handleChangeEmail={handleChangeEmail}
        handleResetValue={handleResetValue}
      />
      <div className="p-1"></div>
      <FormCheckbox
        handleToggleCheckbox={handleToggleCheckbox}
        isChecked={isChecked}
      />
      <button
        className="btn btn-primary mt-auto"
        disabled={isValidEmail === "email is ok" && isChecked ? false : true}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
      >
        Hold to proceed {timer === 0 ? "" : `${timer} ms`}
      </button>
    </>
  );
}

export default LoginFirstPage;
