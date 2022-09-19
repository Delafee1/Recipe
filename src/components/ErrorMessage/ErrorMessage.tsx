import React from "react";
import { useNavigate } from "react-router-dom";
import { apiChange } from "utils/api";

import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  errorText: string;
  error402?: boolean;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorText,
  error402 = false
}: ErrorMessageProps) => {
  const navigate = useNavigate();
  
  const submitHandler = (e: any) => {
    e.preventDefault();
    apiChange(e.target[0].value);
    navigate("/");
  }
  if (errorText === "Your daily points limit of 150 has been reached. Please upgrade your plan to continue using the API.") {
    error402 = true;
  }
  return (
    <div className={styles.errormessage}>      
      <div className={styles.errormessage__text}>{errorText}</div>
      {error402 && (
        <form
          className={styles.errormessage__form} 
          onSubmit={(e) => submitHandler(e)}
        >
          <input className={styles.errormessage__form__input} type="text" />
          <input
            className={styles.errormessage__form__button}
            type="submit"
            value="Change API Key"
          />
        </form>
      )}
      <span className={styles.errormessage__cross}/>
    </div>
  );
};

export default ErrorMessage;
