import { Outlet, useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./header/Header";
import Footer from "./Footer";
import MailList from "./MailList";
import DataContext from "../../context/DataContext";

export default function Layout() {
  // const resData = useLoaderData();
  // const dataCTX = useContext(DataContext);

  // useEffect(() => {
  //   // Bổ sung điều kiện kiểm tra để tránh gọi API lại khi đã có dữ liệu
  //   if (dataCTX.hotelData.length === 0) {
  //     dataCTX.setHotelDataFunction();
  //   }
  // }, []);
  // if (!resData?.session) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
      <MailList />
      <Footer />
    </>
  );
}
