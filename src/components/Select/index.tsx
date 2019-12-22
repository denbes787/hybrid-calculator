import React, { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "@hybrid/hooks";

export function Select({
  options,
  value,
  onChange,
  className
}: {
  options: any;
  value: any;
  onChange: (value: any) => void;
  className?: string;
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [compValue, setCompValue] = useState(value);

  const selectedItem = options.filter(
    (item: any) => compValue && item.value === compValue
  );

  useEffect(() => {
    setCompValue(value);
  }, [value]);

  useOutsideClick(ref, () => {
    setOpen(false);
  });

  const onChangeHandler = (item: any) => {
    setCompValue(item.value);
    setOpen(false);
    onChange(item.value);
  };

  const toggleOpen = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <div
      className={className ? className + " selectContainer" : "selectContainer"}
      ref={ref}
    >
      <div onClick={toggleOpen} className="selectContent">
        {selectedItem[0] ? selectedItem[0].label : "Select an item"}
      </div>
      {open && (
        <ul className="selectBox">
          {options.map((item: any) => (
            <li
              key={item.value}
              onClick={() => onChangeHandler(item)}
              className="selectItem"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
