const BASE_URL = "http://localhost:5000";

// 🔧 Hàm dùng để gọi API: linh hoạt method + body
export async function fetchData(endpoint, method = "GET", body = null) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      // Nếu lỗi 401 (unauthorized), không cần console.error
      if (res.status === 401) {
        return { error: true, message: "Unauthorized access" };
      }

      throw new Error(`Request failed! Status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    if (err.message?.includes("401")) {
      // Không log khi lỗi là do chưa đăng nhập
      return { error: true, message: "Unauthorized access" };
    }

    console.error("Fetch error:", err);
    return { error: true, message: err.message || "Server error" };
  }
}

// ✅ API gọi danh sách khách sạn
export const getDataOfHotel = () => fetchData(`client/getData/get-hotel-data`);
