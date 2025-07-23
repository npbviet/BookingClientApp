import { fetchData } from "../api/fetchData";

// ✅ Lấy thông tin người dùng đang hoạt động
export async function getActiveUserInfor() {
  const result = await fetchData("client/auth/getActiveUserInfor");

  if (result?.error && result.message === "Unauthorized access") {
    return {
      session: { isLoggedIn: false },
      user: null,
    };
  }

  return result;
}

// ✅ Kiểm tra người dùng có đang đăng nhập không
export async function checkLogin() {
  const { session } = await getActiveUserInfor();
  // console.log(session);
  if (!session?.isLoggedIn) {
    localStorage.clear();
    return false;
  }
  return true;
}
