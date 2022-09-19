import React from "react";

import cn from "classnames";

import styles from "./Input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  onChange,
  className,
  disabled,
  ...props
}: InputProps) => {
  return (
    <input
      className={cn(styles.input, className, disabled && styles.input_disabled)}
      onChange={onChange}
      disabled={disabled}
      type="text"
      {...props}
    />
  );
};

export default React.memo(Input);
