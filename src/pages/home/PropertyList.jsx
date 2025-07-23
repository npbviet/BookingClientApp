import { useContext, useMemo, useEffect } from "react";
import styles from "./PropertyList.module.css";
import DataContext from "../../context/DataContext";

// Chuẩn hóa danh sách loại khách sạn ngay từ đầu
const listTypeHotelData = [
  { type: "Hotel", image: "/images/typeHotel/type_1.webp" },
  { type: "Apartments", image: "/images/typeHotel/type_2.jpg" },
  { type: "Resorts", image: "/images/typeHotel/type_3.jpg" },
  { type: "Villas", image: "/images/typeHotel/type_4.jpg" },
  { type: "Cabins", image: "/images/typeHotel/type_5.jpg" },
];

export default function PropertyList() {
  const { hotelData, setHotelDataFunction } = useContext(DataContext);

  // Chỉ gọi 1 lần khi component mount
  useEffect(() => {
    setHotelDataFunction();
  }, [setHotelDataFunction]);

  // Đếm số lượng khách sạn theo loại
  const hotelCountByType = useMemo(() => {
    if (!hotelData) return {};

    return hotelData.reduce((acc, item) => {
      const type = item.type?.trim().toLowerCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  }, [hotelData]);

  return (
    <div>
      <div className={styles.pList}>
        {/* Hiển thị danh sách loại khách sạn */}
        {listTypeHotelData.map(({ type, image }) => {
          const normalizedType = type.toLowerCase();
          const count = hotelCountByType[normalizedType] || 0;

          return (
            <div key={type} className={styles.pListItem}>
              <img
                src={image || "/images/default-type.jpg"}
                alt={type}
                className={styles.pListImg}
              />
              <div className={styles.pListTitles}>
                <h1>{type}</h1>
                <h2>{`${count} ${type}`}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
