import React, { useState, useMemo, useEffect, useCallback } from "react";
import { getDataOfHotel } from "../util/api/fetchData";
import { getActiveUserInfor } from "../util/auth/auth";

const DataContext = React.createContext();

export const DataContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState({
    email: null,
    isLoggedIn: false,
  });

  const [loading, setLoading] = useState(true); // ✅ THÊM để chờ kiểm tra session

  const [hotelData, setHotelData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    city: "",
    dateStart: null,
    dateEnd: null,
    totalPeople: 2,
    roomQuantity: 1,
    minPrice: 1,
    maxPrice: 999,
  });

  const setActiveUserFunction = useCallback((email, isLoggedIn) => {
    setActiveUser({ email, isLoggedIn });
  }, []);

  const setHotelDataFunction = useCallback(async () => {
    try {
      const data = await getDataOfHotel();
      if (Array.isArray(data)) {
        setHotelData(data);
      } else {
        console.error("Dữ liệu khách sạn không phải là mảng", data);
        setHotelData([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khách sạn:", error);
      setHotelData([]);
    }
  }, []);

  const setTransactionDataFunction = useCallback((data) => {
    if (Array.isArray(data)) {
      setTransactionData(data);
    } else {
      setTransactionData([]);
    }
  }, []);

  const setSearchParamsFunction = useCallback((params) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  }, []);

  // ✅ Check session khi app mount
  useEffect(() => {
    async function checkSessionAndRestoreUser() {
      try {
        const data = await getActiveUserInfor();
        // console.log(data);
        if (data?.session?.isLoggedIn && data.session.user?.email) {
          // console.log("true", data?.session?.isLoggedIn && data.user?.email);
          setActiveUserFunction(data.session.user.email, true);
        } else {
          // console.log("false", data.session.user.email);
          setActiveUserFunction(null, false);
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra session:", err);
        setActiveUserFunction(null, false);
      } finally {
        setLoading(false); // ✅ Dừng loading sau khi check xong
      }
    }

    checkSessionAndRestoreUser();
  }, [setActiveUserFunction]);

  useEffect(() => {
    setHotelDataFunction();
  }, [setHotelDataFunction]);

  const providerValue = useMemo(
    () => ({
      activeUser,
      hotelData,
      searchParams,
      transactionData,
      loading,

      setActiveUserFunction,
      setHotelDataFunction,
      setTransactionDataFunction,
      setSearchParamsFunction,
    }),
    [
      activeUser,
      hotelData,
      searchParams,
      transactionData,
      loading,
      setActiveUserFunction,
      setHotelDataFunction,
      setTransactionDataFunction,
      setSearchParamsFunction,
    ]
  );

  return (
    <DataContext.Provider value={providerValue}>
      {loading ? null : children}
      {/* ✅ CHỈ render app khi xong check session */}
    </DataContext.Provider>
  );
};

export default DataContext;
