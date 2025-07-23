import { fetchData } from "../api/fetchData";
import { checkLogin } from "../auth/auth";

// ✅ API tìm kiếm khách sạn theo điều kiện
export async function getHotelDataForSearching(
  city,
  dateStart,
  dateEnd,
  totalPeople,
  roomQuantity,
  minPrice = null,
  maxPrice = null
) {
  if (!(await checkLogin())) return [];

  const params = {
    city,
    dateStart: new Date(dateStart).toISOString(),
    dateEnd: new Date(dateEnd).toISOString(),
    totalPeople,
    roomQuantity,
    minPrice,
    maxPrice,
  };

  const res = await fetchData(`client/getData/search-hotel`, "POST", params);
  return Array.isArray(res?.availableHotels) ? res.availableHotels : [];
}

// ✅ API xem chi tiết khách sạn
export const getHotelDetails = async (hotelID) =>
  (await checkLogin())
    ? fetchData(`client/getData/details-hotel`, "POST", { hotelID })
    : null;

// ✅ API lưu thông tin đặt phòng
export const postBookingData = async (bookingInfor) =>
  (await checkLogin())
    ? fetchData(`client/setData/booking`, "POST", { bookingInfor })
    : null;
