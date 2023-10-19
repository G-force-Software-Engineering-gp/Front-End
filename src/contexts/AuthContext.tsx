import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";
// import axiosInstance from "../utils/axiosInstance";


export type AuthContextType = {
  user: any; // Replace with your user type
  setUser: React.Dispatch<React.SetStateAction<any>>;
  authTokens: any; // Replace with your auth tokens type
  setAuthTokens: React.Dispatch<React.SetStateAction<any>>;
  loginUser: (values: any) => Promise<void>;
  registerUser: (values: any) => Promise<void>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
type AuthProviderProps = {
    children: React.ReactNode;
  };
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<any>(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );
  const [user, setUser] = useState<any>(
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens")!)
      : null
  );
  const [loading, setloading] = useState(true);

  const Navigate = useNavigate();

  const loginUser = async (values: any) => {
    const response = await fetch(
        "https://amirmohammadkomijani.pythonanywhere.com/auth/jwt/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        Navigate("/");
      } 
      else{
        console.log(data.error);
      }
  };
  //axios approach
        // await axios.post("https://amirmohammadkomijani.pythonanywhere.com/auth/jwt/create/",
        //     {
        //     email: values.email,
        //     password: values.password,
        //     },
        //     {
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     })
        //     .then((response) => {
        //     const data = response.data;
        //     console.log(data);
        
        //     if (response.status === 200) {
        //         setAuthTokens(data);
        //         setUser(jwt_decode(data.access));
        //         localStorage.setItem('authTokens', JSON.stringify(data));
        //         Navigate('/');
        //     } else {
        //         console.log(data.error);
        //     }
        //     })
        //     .catch((error) => {
        //     console.error('API request failed:', error);
        //     });
        // }
  const registerUser = async (values: any) => {
      const reg_response = await fetch(
      "https://amirmohammadkomijani.pythonanywhere.com/auth/users/",
      {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          username: values.username,
          password: values.password,
          }),
      });
      console.log(reg_response);
      const reg_data = await reg_response.json();
      if (reg_response.status === 201) {
        Navigate("/login");
      } else {
          console.log(reg_data.error);  
      }
  };

  //axios approach
        // await axios.post("https://amirmohammadkomijani.pythonanywhere.com/auth/users/",
        //     {
        //     first_name: values.firstName,
        //     last_name: values.lastName,
        //     email: values.email,
        //     username: values.username,
        //     password: values.password,
        //     },
        //     {
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     })
        //     .then((reg_data) => {
        //         const data = reg_data.data;
        //         console.log(data);
        //         if (reg_data.status === 201) {
        //           Navigate('/login');
        //         } else {
        //           console.log(data.error);
        //         }
        //       })
        //       .catch((error) => {
        //         console.error('API request failed:', error);
        //       });
        // }

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    Navigate("/login");
  };

  const contextData: AuthContextType = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    registerUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
        setUser(jwt_decode(authTokens.access));
      }
      setloading(false);
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
