import Button from "../../components/button/Button";
import styles from "./HotelInfo.module.css";

const HotelInfo = ({ hotelInfo, bookingHandler, disabled }) => {
  return (
    <div className={styles["hotel-info-container"]}>
      {hotelInfo && (
        <div className={`${styles["hotel-infor"]}`}>
          <div className={styles["hotel-detail"]}>
            <p className={styles["hotel-name"]}>{hotelInfo.name}</p>
            <p className={styles["hotel-desc"]}>{hotelInfo.desc}</p>
          </div>
          <div className={`${styles["frame-price-detail"]}`}>
            <p>
              ${hotelInfo.cheapestPrice} <span>(1 nights)</span>
            </p>
            <Button
              className={styles["booking-button"]}
              onClick={bookingHandler}
              disabled={disabled}
            >
              Reserve or Book Now!
            </Button>
            {disabled && (
              <div className={styles["error-text"]}>
                **Please fill in all required fields and select valid rooms.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelInfo;
