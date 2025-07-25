import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Authen from "./pages/authen/Authen";
import Search from "./pages/search/Search";
import HotelDetail from "./pages/hotel/HotelDetail";
import Booking from "./pages/booking/Booking";
import Transactions from "./pages/transactions/Transactions";

import { DataContextProvider } from "./context/DataContext";
import { authAction } from "./util/auth/action";
import { getAuthenInforLoader, handlerForAuthRouter } from "./util/auth/loader";
import { protectRouterLoader } from "./util/protect/routeGuard";

const route = createBrowserRouter([
  {
    path: "/",
    loader: getAuthenInforLoader, // Kiểm tra thông tin người dùng
    element: <Layout />,
    children: [
      {
        path: "auth",
        element: <Authen />,
        action: authAction, // Xử lý đăng nhập và đăng ký
        loader: handlerForAuthRouter, // Kiểm tra nếu đã đăng nhập thì chuyển hướng
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
        loader: protectRouterLoader, // Bảo vệ route nếu chưa đăng nhập
      },
      {
        path: "detail/:hotelID",
        element: <HotelDetail />,
        loader: protectRouterLoader,
      },
      {
        path: "booking",
        element: <Booking />,
        loader: protectRouterLoader,
      },
      {
        path: "transactions",
        element: <Transactions />,
        loader: protectRouterLoader,
      },
    ],
  },
]);

function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  );
}

export default App;
