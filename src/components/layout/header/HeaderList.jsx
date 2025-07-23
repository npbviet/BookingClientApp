import { useState } from "react";
import styles from "./HeaderList.module.css";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const headerItems = [
  { icon: faBed, label: "Stays" },
  { icon: faPlane, label: "Flights" },
  { icon: faCar, label: "Car rentals" },
  { icon: faTaxi, label: "Airport taxis" },
];

const HeaderList = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 🟡 Theo dõi mục active

  return (
    <div className={styles.headerList}>
      {headerItems.map((item, index) => (
        <div
          key={index}
          className={classNames(styles.headerListItem, {
            [styles.active]: index === activeIndex, // 🟡 Highlight mục đang chọn
          })}
          onClick={() => setActiveIndex(index)} // 🟡 Cập nhật khi click
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default HeaderList;
