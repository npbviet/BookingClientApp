import { redirect } from "react-router-dom";
import { getActiveUserInfor, checkLogin } from "./auth";

// Hàm chung kiểm tra đăng nhập và xử lý chuyển hướng
async function checkAndRedirect(redirectPath) {
  const isLoggedIn = await checkLogin();

  return isLoggedIn ? redirect(redirectPath) : null;
}

// Lấy thông tin người dùng đang hoạt động
export async function getAuthenInforLoader() {
  return await getActiveUserInfor();
}

// Xử lý route `/auth`: Nếu đã đăng nhập, chuyển hướng về trang Home
export async function handlerForAuthRouter() {
  return await checkAndRedirect("/");
}
