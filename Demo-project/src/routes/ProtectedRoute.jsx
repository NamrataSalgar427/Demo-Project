import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();

  /*
   * The backend should store the authentication
   * token after successful admin login.
   *
   * Example:
   * localStorage.setItem("token", data.token);
   */

  const token = localStorage.getItem("token");

  /*
   * If there is no token,
   * send the user to the login page.
   */

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  /*
   * If authenticated,
   * render the requested admin route.
   */

  return <Outlet />;
}

export default ProtectedRoute;