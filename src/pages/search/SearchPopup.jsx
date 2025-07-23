import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { getHotelDataForSearching } from "../../util/hotel/hotelService";
import styles from "./SearchPopup.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../../components/button/Button";
import DataContext from "../../context/DataContext";

export default function SearchPopup({ sendHotelData }) {
  //1. Lấy dữ liệu và hàm cập nhật từ context
  const {
    searchParams: { city, dateStart, dateEnd, totalPeople, roomQuantity },
    setSearchParamsFunction,
  } = useContext(DataContext);

  //2.1 Trạng thái để hiển thị/ẩn date picker
  const [showDateRange, setShowDateRange] = useState(false);

  // 🔁 State lưu dữ liệu form nhập vào
  const [formData, setFormData] = useState({
    city: "",
    minPrice: 1,
    maxPrice: 999,
    adult: 1,
    children: 0,
    room: 1,
    date: [{ startDate: new Date(), endDate: new Date(), key: "selection" }],
  });

  // ✅ Cập nhật form từ dữ liệu trong context mỗi khi searchParams thay đổi
  useEffect(() => {
    const adults = Math.max(1, (totalPeople || 2) - 1);
    const children = Math.max(0, (totalPeople || 2) - adults);

    setFormData((prev) => ({
      ...prev,
      city: city || "",
      room: roomQuantity || 1,
      adult: adults,
      children,
      date: [
        {
          startDate: dateStart ? new Date(dateStart) : new Date(),
          endDate: dateEnd ? new Date(dateEnd) : new Date(),
          key: "selection",
        },
      ],
    }));
  }, [city, dateStart, dateEnd, totalPeople, roomQuantity]);
  //2.2 Xử lý khi người dùng chọn ngày
  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection;

    setFormData((prev) => ({
      ...prev,
      date: [item.selection],
    }));

    // Nếu chọn đủ 2 ngày khác nhau thì mới ẩn Date Picker
    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      setShowDateRange(false);
    }
  };

  //3. Xử lý khi người dùng thay đổi input (thành phố, giá, người, phòng)
  const handleInputChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({
      ...prev,
      [name]: name === "city" ? value : Number(value),
    }));

  //4. Xử lý khi bấm nút "Search"
  const handleSearch = async () => {
    const totalPeople = adult + children;

    if (
      !cityInput ||
      !date[0].startDate ||
      !date[0].endDate ||
      totalPeople <= 0 ||
      room <= 0 ||
      minPrice <= 0 ||
      maxPrice <= minPrice
    ) {
      return alert("Please enter valid search inputs");
    }

    //4.1. Cập nhật lại context trước khi gửi dữ liệu đi
    setSearchParamsFunction({
      city: cityInput,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      totalPeople,
      roomQuantity: room,
      minPrice,
      maxPrice,
    });

    //4.2. Gửi request lấy danh sách khách sạn
    const hotelData = await getHotelDataForSearching(
      cityInput,
      date[0].startDate,
      date[0].endDate,
      totalPeople,
      room,
      minPrice,
      maxPrice
    );

    sendHotelData(hotelData);
    alert("Search completed");
  };

  //5. Destructure dữ liệu để dùng trong JSX
  const {
    city: cityInput,
    date,
    minPrice,
    maxPrice,
    adult,
    children,
    room,
  } = formData;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h4 className={styles.lsTitle}>Search</h4>

      <div className={styles.lsItem}>
        <label>Destination</label>
        <input
          type="text"
          name="city"
          placeholder="Where are you going?"
          value={cityInput}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.lsItem}>
        <label>Check-in Date</label>
        <input
          className={styles["input-date-range"]}
          type="text"
          value={`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
            date[0].endDate,
            "dd/MM/yyyy"
          )}`}
          readOnly
          onClick={() => setShowDateRange(!showDateRange)}
        />
        {showDateRange && (
          <div className={styles.dateRange}>
            <DateRange
              editableDateInputs
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              ranges={date}
              onChange={handleDateChange}
            />
          </div>
        )}
      </div>

      <div className={styles.lsItem}>
        <label>Options</label>
        <div className={styles.lsOption}>
          {[
            ["Min price per night", "minPrice", 1, minPrice],
            ["Max price per night", "maxPrice", 1, maxPrice],
            ["Adult", "adult", 1, adult],
            ["Children", "children", 0, children],
            ["Room", "room", 1, room],
          ].map(([label, name, min, value]) => (
            <div className={styles.lsOptionItem} key={name}>
              <span className={styles.lsOptionText}>{label}</span>
              <input
                className={styles.lsOptionInput}
                type="number"
                name={name}
                min={min}
                value={value}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
        </div>
      </div>

      <Button className={styles.lsBtn} type="primary" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
}
