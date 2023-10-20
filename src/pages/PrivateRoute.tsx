import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
  //const authenticated = false;
  const user = useContext(AuthContext)?.user;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
