import api from "./api";

const authService = {

  // Admin Login
  login: async (email, password) => {
    const data = await api(
      "/api/auth/login",
      {
        method: "POST",

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    /*
     * Expected backend response could be:
     *
     * {
     *   token: "...",
     *   admin: {...}
     * }
     *
     * Confirm exact response with backend teammate.
     */

    if (data.token) {
      localStorage.setItem(
        "token",
        data.token
      );
    }

    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  },

  // Check login status
  isAuthenticated: () => {
    return Boolean(
      localStorage.getItem("token")
    );
  },
};

export default authService;