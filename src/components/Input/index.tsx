import React, { useState, useRef, useEffect } from "react";

export function Input({
  value,
  currency,
  suffix,
  onChange
}: {
  value: any;
  currency?: boolean;
  suffix?: string;
  onChange: (value: string) => void;
}) {
  const inputEl = useRef<HTMLInputElement>(null);
  const [inputValue, setValue] = useState(value);
  const [isEditting, setIsEditting] = useState(false);

  const onChangeHandler = (e: any) => {
    if (Number(e.target.value) >= 0) {
      setValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const onBlur = (e: any) => {
    setIsEditting(false);
  };

  const formatNumber = (num: number) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const currencyFormat = (num: any) =>
    "$" +
    parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const editHandler = (e: any) => {
    setIsEditting(true);
  };

  return (
    <span className="inputContainer" onClick={editHandler}>
      <input
        className={isEditting ? "active" : ""}
        ref={inputEl}
        type="number"
        value={inputValue}
        onChange={onChangeHandler}
        onBlur={onBlur}
      />
      {!isEditting && (
        <span>
          {currency ? currencyFormat(inputValue) : formatNumber(inputValue)}
          <sup>{suffix}</sup>
        </span>
      )}
    </span>
  );
}

Input.defaultProps = {
  currency: false
};
