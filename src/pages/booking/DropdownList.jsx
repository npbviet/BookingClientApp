import { useEffect, useState } from "react";
import styles from "./DropdownList.module.css";

export default function DropdownList({ getSelectedValue }) {
  const [selectedValue, setSelectedValue] = useState("");

  const dropdownListValue = [
    "Master Card",
    "Credit Card",
    "Visa Card",
    "Cash Payment",
    "Check Payment",
    "Banking Payment",
  ];

  useEffect(() => {
    getSelectedValue(selectedValue);
  }, [selectedValue]);

  const onChangeHandler = (event) => {
    const value = event.target.value;
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  };

  return (
    <div>
      <select
        className={`${styles["select-option"]} ${
          selectedValue === "" ? styles["default-style"] : ""
        }`}
        onChange={onChangeHandler}
        value={selectedValue}
      >
        <option value="" hidden>
          Select Payment Method
        </option>
        {dropdownListValue.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
