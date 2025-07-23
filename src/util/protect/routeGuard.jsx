import { redirect } from "react-router-dom";
import { getActiveUserInfor } from "../auth/auth";

// Bảo vệ route khi người dùng chưa đăng nhập
export async function protectRouterLoader() {
  const sessionData = await getActiveUserInfor();
  const isLoggedIn = sessionData?.session?.isLoggedIn ?? false;

  if (!isLoggedIn) {
    return redirect("/auth?mode=login");
  }
  return null;
}
