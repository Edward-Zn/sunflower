import { showError } from "./toastNotifications";
import log from "./logger";

const API_URL = process.env.REACT_APP_API_URL;

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });

    if (response.status === 401) {
      throw new Error("Unauthorized — Please log in again");
    }

    if (response.status === 403) {
      showError("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/";

      return null; // Ensure nothing continues after redirect
    }

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Something went wrong (api)");
    }

    return await response.json();
  } catch (error) {
    showError(error.message || "Network error (api). Please try again.");
    log.error("API error:", error);

    throw error;
  }
};

export default fetchWithAuth;
