import { Route, Routes} from "react-router-dom";
import Login from "./loginSignup/Login"
import Home from "./HomePage/Home";
import Board from "./Board";
import Register from "./loginSignup/Register";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";



const Router = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/board/:boardId" element={<Board/>}/>
          </Route>
        </Routes>
      </AuthProvider>
      
    </div>
  )
}

export default Router
