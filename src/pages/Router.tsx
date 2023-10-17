import { Route, Routes} from "react-router-dom";
import Login from "./loginSignup/Login"
import Home from "./HomePage/Home";
import Board from "./Board";


const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/board" element={<Board/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
