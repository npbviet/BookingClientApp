import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotelDetails } from "../../util/hotel/hotelService";
import styles from "./HotelDetail.module.css";
import Button from "../../components/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function HotelDetail() {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { hotelID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getHotelDetails(hotelID)
      .then((data) => {
        setHotelDetails(data);
      })
      .catch((err) => {
        console.error("Error fetching hotel details:", err);
        setError("Failed to load hotel details. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hotelID]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    const total = hotelDetails.photos.length;
    setSlideNumber((prev) => {
      if (direction === "l") return prev === 0 ? total - 1 : prev - 1;
      else return prev === total - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className={styles.hotelContainer}>
      {loading && (
        <p className={styles["alt-text-details"]}>Loading hotel details...</p>
      )}

      {!loading && error && (
        <p className={styles["alt-text-details"]}>{error}</p>
      )}

      {!loading && hotelDetails && (
        <div>
          {/* Hiện thị ảnh toàn màn hình */}
          {open && (
            <div className={styles.slider}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={styles.close}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={styles.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={styles.sliderWrapper}>
                <img
                  src={hotelDetails.photos[slideNumber]}
                  alt=""
                  className={styles.sliderImg}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={styles.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          {/* Thông tin khách sạn */}
          <div className={styles.hotelWrapper}>
            <div className={styles.flexWrapper}>
              <h1 className={styles.hotelTitle}>{hotelDetails.name}</h1>
              <Button
                onClick={() => navigate("/booking", { state: { hotelID } })}
              >
                Reserve or Book Now!
              </Button>
            </div>

            <div className={styles.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotelDetails.address}</span>
            </div>
            <span className={styles.hotelDistance}>
              Excellent location - {hotelDetails.distance}m from center
            </span>
            <span className={styles.hotelPriceHighlight}>
              Book a stay over ${hotelDetails.cheapestPrice} at this property
              and get a free airport taxi
            </span>
          </div>

          {/* Hình ảnh khách sạn */}
          <div className={styles.hotelImages}>
            {hotelDetails.photos.map((photo, i) => (
              <div className={styles.hotelImgWrapper} key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className={styles.hotelImg}
                />
              </div>
            ))}
          </div>

          {/* Thông tin chi tiết */}
          <div className={styles.hotelDetails}>
            <div className={styles.hotelDetailsTexts}>
              <h1 className={styles.hotelTitle}>{hotelDetails.title}</h1>
              <p className={styles.hotelDesc}>{hotelDetails.desc}</p>
            </div>
            <div className={styles.hotelDetailsPrice}>
              <h2>
                ${hotelDetails.cheapestPrice} <span>(1 night)</span>
              </h2>
              <Button
                onClick={() => navigate("/booking", { state: { hotelID } })}
              >
                Reserve or Book Now!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
