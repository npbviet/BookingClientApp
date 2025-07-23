import { useContext, useMemo } from "react";
import styles from "./FeaturedProperties.module.css";
import DataContext from "../../context/DataContext";

export default function FeaturedProperties() {
  const { hotelData } = useContext(DataContext);

  // Lấy danh sách 3 khách sạn có rating cao nhất với useMemo để tối ưu hiệu suất
  const topThreeHotels = useMemo(() => {
    return [...hotelData]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3);
  }, [hotelData]);

  return (
    <div>
      <div className={styles.fp}>
        {/* Render danh sách khách sạn */}
        {topThreeHotels.map((item) => (
          <div key={item._id} className={styles.fpItem}>
            {/* Hình ảnh khách sạn */}
            <img
              src={item.photos?.[0] || "/images/default-hotel.jpg"}
              alt={item.name}
              className={styles.fpImg}
            />

            {/* Thông tin khách sạn */}
            <div className={styles["hotel-inform"]}>
              <a href={`/detail/${item._id}`} className={styles.fpName}>
                {item.name}
              </a>
              <p className={styles.fpCity}>{item.city}</p>
              <p className={styles.fpPrice}>
                Starting from ${item.cheapestPrice}
              </p>
              <p className={styles["rating-hotel"]}>
                <span>
                  <strong>Rating: </strong>
                  <span className={styles["rating-mark"]}>
                    {item.rating ? item.rating.toFixed(1) : "N/A"}
                  </span>
                </span>
                <span>
                  <strong>Type: </strong>
                  <span>{item.type}</span>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
