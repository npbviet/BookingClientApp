import { json } from "react-router-dom";
import { fetchData } from "../api/fetchData";
import { checkLogin } from "./auth";

// 🧩 Action cho việc xác thực (authentication)
export async function authAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const authMode = formData.get("authMode");

    const apiURL = `http://localhost:5000/client/auth/${authMode}`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ Gửi cookie (session) kèm theo
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json(errorData, { status: response.status });
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    return json(
      {
        status: 500,
        message: "Server error. Please try again later!",
        isAuthError: true,
      },
      { status: 500 }
    );
  }
}
// ✅ API lấy thông tin đặt phòng theo email
export const getTransactionDataByEmail = async (userEmail) =>
  (await checkLogin())
    ? fetchData(`client/getData/transactions`, "POST", { userEmail })
    : null;
