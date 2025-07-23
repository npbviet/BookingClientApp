import { fetchData } from "../api/fetchData";

export async function logoutUser(navigate, setActiveUserFunction) {
  if (window.confirm("Do you really want to log out?")) {
    try {
      const res = await fetchData("client/auth/logout", "GET");

      if (res?.error) {
        console.error("Logout failed:", res.message);
        return;
      }

      localStorage.clear();
      setActiveUserFunction(null, false); // ✅ Cập nhật context
      navigate("/"); // ✅ Điều hướng sau khi set state
    } catch (err) {
      console.error("Logout Error:", err);
    }
  }
}
