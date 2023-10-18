import { Route, Routes} from "react-router-dom";
import Login from "./loginSignup/Login"
import Home from "./HomePage/Home";
import Board from "./Board";
import Register from "./loginSignup/Register";



const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/board" element={<Board/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
