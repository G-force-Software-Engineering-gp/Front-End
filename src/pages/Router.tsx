import { Route, Routes} from "react-router-dom";
import Login from "./loginSignup/Login"


const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
