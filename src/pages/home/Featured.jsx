import { useContext, useMemo, useCallback } from "react";
import styles from "./Featured.module.css";
import DataContext from "../../context/DataContext";

// Danh sách thành phố
const featuredData = [
  { name: "Ha Noi", image: "/images/city/HaNoi.jpg" },
  { name: "Ho Chi Minh", image: "/images/city/HCM.jpg" },
  { name: "Da Nang", image: "/images/city/DaNang.jpg" },
];

export default function Featured() {
  const { hotelData } = useContext(DataContext);

  // Hàm tối ưu để lấy số lượng khách sạn theo thành phố
  const getNumberOfHotelByCity = useCallback(
    (cityName) => hotelData.filter((item) => item.city === cityName).length,
    [hotelData]
  );

  // Tối ưu danh sách thành phố bằng useMemo
  const renderedFeatured = useMemo(
    () =>
      featuredData.map((item, index) => (
        <div key={index} className={styles.featuredItem}>
          <img
            src={item.image}
            alt={item.name}
            className={styles.featuredImg}
          />
          <div className={styles.featuredTitles}>
            <h1>{item.name}</h1>
            <h2>{getNumberOfHotelByCity(item.name)} properties</h2>
          </div>
        </div>
      )),
    [hotelData, getNumberOfHotelByCity]
  );

  return <div className={styles.featured}>{renderedFeatured}</div>;
}
