import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";

const SecondLoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail !== null) {
      setEmail(storedEmail);
    }

    const handleKeydown = (event: KeyboardEvent): void => {
      if (
        (event.key === "Escape" && status !== "idle") ||
        (event.key === "Backspace" && status !== "idle")
      ) {
        setStatus("idle");
        event.preventDefault();
      }
    };

    window.addEventListener("popstate", () => {
      setStatus("idle");
    });
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("popstate", () => {
        setStatus("idle");
      });
    };
  }, [status]);

  const handleBackClick = () => {
    history.goBack();
  };

  const handleConfirmClick = () => {
    fetch("/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-2 flex-grow">
          <span>Email</span>
          <span className="py-3 px-3 bg-[#1d232a]">{email}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button classes="flex-1 px-3" handleButtonClick={handleBackClick}>
          Back
        </Button>
        <Button
          handleButtonClick={handleConfirmClick}
          classes="flex-1 px-3 btn-primary"
        >
          Confirm
        </Button>
      </div>
      {status !== "idle" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
          <h3
            className={status === "success" ? "text-green-500" : "text-red-500"}
          >
            {status.toUpperCase()}
          </h3>
        </div>
      )}
    </>
  );
};

export default SecondLoginPage;
