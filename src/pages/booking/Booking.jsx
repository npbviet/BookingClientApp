import styles from "./Booking.module.css";
import { useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";
import { Fragment, useContext } from "react";
import DataContext from "../../context/DataContext";

export default function Booking() {
  const location = useLocation();
  const hotelID = location.state?.hotelID;
  const {
    searchParams: { city, dateStart, dateEnd, totalPeople, roomQuantity },
  } = useContext(DataContext);

  const hasAllSearchParams =
    city && dateStart && dateEnd && totalPeople && roomQuantity;

  const isValidBooking = hotelID && hasAllSearchParams;

  return (
    <Fragment>
      {!isValidBooking && (
        <div className={styles["instruction"]}>
          <p className={styles["title"]}>
            To book a hotel, please follow these steps:
          </p>
          <ul className={styles["content"]}>
            <li>Search hotel for booking</li>
            <li>Select a certain hotel and get details of this one</li>
            <li>Click the "Reserve or Book Now" button to book</li>
          </ul>
        </div>
      )}
      {isValidBooking && <BookingForm hotelID={hotelID} />}
    </Fragment>
  );
}
