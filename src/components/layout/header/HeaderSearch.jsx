import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useContext } from "react";
import styles from "./HeaderSearch.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../../button/Button";
import DataContext from "../../../context/DataContext"; // <-- THÊM DÒNG NÀY

const defaultOptions = { adult: 1, children: 0, room: 1 };

const HeaderSearch = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [options, setOptions] = useState(defaultOptions);

  const navigate = useNavigate();
  const { setSearchParamsFunction } = useContext(DataContext); // <-- THÊM DÒNG NÀY

  const formattedDate = useMemo(
    () =>
      `${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
        date[0].endDate,
        "MM/dd/yyyy"
      )}`,
    [date]
  );

  const handleOption = useCallback((name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? prev[name] + 1 : Math.max(1, prev[name] - 1),
    }));
  }, []);

  const handleSearch = useCallback(() => {
    // ✅ Lưu thông tin vào context
    setSearchParamsFunction({
      city: destination,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      totalPeople: options.adult + options.children,
      roomQuantity: options.room,
    });

    // ✅ Điều hướng sang trang /search
    navigate("/search");
  }, [navigate, destination, date, options, setSearchParamsFunction]);

  return (
    <div className={styles.headerSearch}>
      <SearchItem icon={faBed}>
        <input
          type="text"
          placeholder="Where are you going?"
          className={styles.headerSearchInput}
          onChange={(e) => setDestination(e.target.value)}
        />
      </SearchItem>

      <SearchItem icon={faCalendarDays}>
        <span
          onClick={() => setOpenDate(!openDate)}
          className={styles.headerSearchText}
        >
          {formattedDate}
        </span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            ranges={date}
            className={styles.date}
            minDate={new Date()}
          />
        )}
      </SearchItem>

      <SearchItem icon={faPerson}>
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className={styles.headerSearchText}
        >
          {`${options.adult} adult · ${options.children} children · ${options.room} room`}
        </span>
        {openOptions && (
          <div className={styles.options}>
            {["adult", "children", "room"].map((type) => (
              <OptionItem
                key={type}
                type={type}
                value={options[type]}
                handleOption={handleOption}
                min={type === "children" ? 0 : 1}
              />
            ))}
          </div>
        )}
      </SearchItem>

      <SearchItem>
        <Button className={styles.headerBtn} onClick={handleSearch}>
          Search
        </Button>
      </SearchItem>
    </div>
  );
};

const SearchItem = ({ icon, children }) => (
  <div className={styles.headerSearchItem}>
    {icon && <FontAwesomeIcon icon={icon} className={styles.headerIcon} />}
    {children}
  </div>
);

const OptionItem = ({ type, value, handleOption, min }) => (
  <div className={styles.optionItem}>
    <span className={styles.optionText}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
    <div className={styles.optionCounter}>
      <button
        disabled={value <= min}
        className={styles.optionCounterButton}
        onClick={() => handleOption(type, "d")}
      >
        -
      </button>
      <span className={styles.optionCounterNumber}>{value}</span>
      <button
        className={styles.optionCounterButton}
        onClick={() => handleOption(type, "i")}
      >
        +
      </button>
    </div>
  </div>
);

export default HeaderSearch;
