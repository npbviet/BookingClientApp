import { useContext, useEffect, useMemo, useState } from "react";
import SearchList from "./SearchList";
import SearchPopup from "./SearchPopup";

import DataContext from "../../context/DataContext";
import { getHotelDataForSearching } from "../../util/hotel/hotelService";
import styles from "./Search.module.css";

export default function Search() {
  const {
    searchParams: { city, dateStart, dateEnd, totalPeople, roomQuantity },
  } = useContext(DataContext);

  const [listHotel, setListHotel] = useState([]);

  const searchListData = useMemo(
    () =>
      Array.isArray(listHotel)
        ? listHotel.map((item) => ({
            id: item._id?.$oid || item._id,
            name: item.name,
            distance: `${item.distance}m`,
            tag: "Free airport taxi",
            type: item.type,
            description: item.desc,
            free_cancel: item.featured,
            price: item.cheapestPrice,
            rate: item.rating,
            rate_text: "Excellent",
            image_url: item.photos?.[0] || "/images/default-hotel.jpg",
          }))
        : [],
    [listHotel]
  );
  //Chỉ render lần đầu, những lần sau searchpopup tự cập nhật
  useEffect(() => {
    if (!(city && dateStart && dateEnd && totalPeople && roomQuantity)) return;

    getHotelDataForSearching(
      city,
      dateStart,
      dateEnd,
      totalPeople,
      roomQuantity
    )
      .then((data) => {
        const hotels = Array.isArray(data) ? data : data?.availableHotels || [];
        setListHotel(hotels);
      })
      .catch((err) => console.error("❌ Error fetching hotel data:", err));
  }, []);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        <div className={styles.listSearch}>
          <SearchPopup sendHotelData={setListHotel} />
        </div>
        <div className={styles.listResult}>
          {listHotel.length > 0 ? (
            <SearchList searchResult={searchListData} />
          ) : (
            <p className={styles.searchResult}>Not found search results!</p>
          )}
        </div>
      </div>
    </div>
  );
}
