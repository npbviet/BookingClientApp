import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { differenceInCalendarDays } from "date-fns";

import DataContext from "../../context/DataContext";
import {
  getHotelDataForSearching,
  postBookingData,
} from "../../util/hotel/hotelService";

import HotelInfo from "./HotelInfo";
import SelectRoom from "./SelectRoom";
import DropdownList from "./DropdownList";

import Button from "../../components/button/Button";
import styles from "./BookingForm.module.css";

const BookingForm = ({ hotelID }) => {
  const navigate = useNavigate();
  //Lấy dữ liệu từ context
  const {
    searchParams: {
      city,
      dateStart,
      dateEnd,
      totalPeople,
      roomQuantity,
      minPrice,
      maxPrice,
    },
    activeUser,
    setSearchParamsFunction,
  } = useContext(DataContext);
  //1. Hotel Information
  const [hotelInfo, setHotelInfo] = useState(null);
  //1.1. Date Range
  const [date, setDate] = useState([
    {
      startDate: dateStart ? new Date(dateStart) : new Date(),
      endDate: dateEnd ? new Date(dateEnd) : new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (
      !(
        city &&
        totalPeople &&
        roomQuantity &&
        date[0].startDate &&
        date[0].endDate
      )
    )
      return;

    const startDate = date[0].startDate;
    const endDate = date[0].endDate;

    getHotelDataForSearching(
      city,
      startDate,
      endDate,
      totalPeople,
      roomQuantity,
      minPrice,
      maxPrice
    )
      .then((data) => {
        const foundHotel = data.find((hotel) => hotel._id === hotelID);
        setHotelInfo(foundHotel);

        // Reset danh sách phòng khi người dùng đổi ngày
        setSelectedRooms([]);
      })
      .catch((err) => console.error("❌ Error fetching hotel data:", err));
  }, [city, totalPeople, roomQuantity, minPrice, maxPrice, date]);

  //2. Booking Information
  //2.1. Date Total
  const totalDay =
    differenceInCalendarDays(date[0].endDate, date[0].startDate) + 1;
  //2.2. User Information
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: activeUser?.email || "",
    phoneNumber: "",
    cardNumber: "",
  });

  //3. Select Room
  //3.1. Nhóm các phòng theo roomID (để truyền cho cho SelectRoom)
  const groupedRooms = hotelInfo?.allAvailableRooms
    ? hotelInfo.allAvailableRooms.reduce((acc, room) => {
        const key = room.roomID;
        if (!acc[key]) {
          acc[key] = {
            roomID: room.roomID,
            desc: room.desc,
            title: room.title,
            maxPeople: room.maxPeople,
            price: room.price,
            roomNumbers: [],
          };
        }
        acc[key].roomNumbers.push(room.roomNumber);
        return acc;
      }, {})
    : {};
  //3.2. Hàm xử lý chọn phòng
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleRoomSelection = (selectedRoomData) => {
    setSelectedRooms((prevSelected) => {
      const exists = prevSelected.find(
        (r) =>
          r.roomID === selectedRoomData.roomID &&
          r.roomOrder[0] === selectedRoomData.roomOrder[0]
      );

      if (exists) {
        // Bỏ chọn nếu đã tồn tại
        return prevSelected.filter(
          (r) =>
            !(
              r.roomID === selectedRoomData.roomID &&
              r.roomOrder[0] === selectedRoomData.roomOrder[0]
            )
        );
      } else {
        // Thêm nếu chưa tồn tại
        return [...prevSelected, selectedRoomData];
      }
    });
  };

  //3.3. Tính tổng tiền
  const totalBill = selectedRooms.reduce((sum, room) => {
    const roomTotal = (room.price || 0) * (totalDay || 0);
    return sum + roomTotal;
  }, 0);

  //4. Kiểm tra trước khi đặt phòng
  //4.1 Hình thức thanh toán
  const [selectedValue, setSelectedValue] = useState("");
  function getSelectedValueFunction(currentValue) {
    if (currentValue !== "") {
      setSelectedValue(currentValue);
    }
  }
  //4.2 Kiểm tra điều kiện trước khi đặt phòng
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const totalSelectedPeople = selectedRooms.reduce(
      (sum, room) => sum + (room.maxPeople || 0),
      0
    );

    const disable =
      selectedRooms.length < roomQuantity ||
      totalSelectedPeople < totalPeople ||
      totalBill === 0 ||
      userInfo.fullName.trim() === "" ||
      userInfo.email.trim() === "" ||
      userInfo.phoneNumber.trim() === "" ||
      userInfo.cardNumber.trim() === "" ||
      selectedValue === "";
    console.log(roomQuantity, totalSelectedPeople, selectedRooms.length);
    setIsDisabled(disable);
  }, [
    selectedRooms,
    userInfo,
    totalBill,
    roomQuantity,
    totalPeople,
    selectedValue,
  ]);
  //5. Lưu thông tin đặt phòng
  function bookingButtonHandler() {
    const bookingInfor = {
      user: userInfo,
      hotel: hotelID,
      rooms: selectedRooms,
      dateStart: date[0].startDate.toISOString(),
      dateEnd: date[0].endDate.toISOString(),
      totalBill: totalBill,
      paymentMethod: selectedValue,
    };

    postBookingData(bookingInfor);
    navigate("/transactions");
  }

  return (
    <div>
      <div className={styles["body-container"]}>
        {/* Section-1: Hotel Information */}
        <HotelInfo
          hotelInfo={hotelInfo}
          bookingHandler={bookingButtonHandler}
          disabled={isDisabled}
        />

        {/* Section-2: Booking Information */}
        <div className={`${styles["booking-infor"]}`}>
          {/* 2.1: Date Range */}
          <div className={styles["date-range"]}>
            <p className={styles["title"]}>Dates</p>
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              className={styles["myDateRange"]}
              minDate={new Date()}
              onChange={(item) => {
                const selectedRange = item.selection;
                setDate([selectedRange]);

                // ✅ Cập nhật context
                setSearchParamsFunction((prev) => ({
                  ...prev,
                  dateStart: selectedRange.startDate,
                  dateEnd: selectedRange.endDate,
                }));
              }}
              ranges={date}
            />
          </div>
          {/* 2.2: User Information */}
          <div className={styles["user-infor"]}>
            <p className={styles["title"]}>Reserve Infor</p>
            <div className={styles["infor"]}>
              <p>Your Full Name:</p>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, fullName: e.target.value }))
                }
              />

              <p>Your Email:</p>
              <input
                type="text"
                placeholder="Email"
                value={userInfo.email}
                className={styles["email-disabled"]}
                readOnly
              />

              <p>Your Phone Number:</p>
              <input
                type="text"
                placeholder="Phone Number"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />

              <p>Your Identity Card Number:</p>
              <input
                type="text"
                placeholder="Card Number"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Section-3: Room Information For Booking */}
        <div className={styles["room-booking-container"]}>
          <p className={styles["title"]}>Select Rooms</p>

          <div>
            {!hotelInfo?.allAvailableRooms?.length && (
              <p className={styles["text-note"]}>
                No found any rooms for booking!
              </p>
            )}

            {hotelInfo?.allAvailableRooms?.length > 0 && (
              <div className={styles["room-summary"]}>
                {Object.values(groupedRooms).map((group) => (
                  <SelectRoom
                    room={group}
                    key={group.roomID}
                    onRoomSelect={handleRoomSelection}
                  />
                ))}
              </div>
            )}

            <div className={styles["booking-container"]}>
              <p className={styles["total-bill"]}>
                Total Bill: ${totalBill.toLocaleString("en-US")}
              </p>
              <div className={styles["booking-control"]}>
                <DropdownList getSelectedValue={getSelectedValueFunction} />
                <Button onClick={bookingButtonHandler} disabled={isDisabled}>
                  Reserve Now
                </Button>
              </div>
              {isDisabled && (
                <p className={styles["error-text"]}>
                  **Please fill in all required fields and select valid rooms.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
