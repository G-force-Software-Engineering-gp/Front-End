import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  authTokens: any;
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
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null
  );
  const [user, setUser] = useState<any>(
    localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')!) : null
  );
  const [loading, setloading] = useState(true);

  const Navigate = useNavigate();

  const loginUser = async (values: any) => {
    const response = await fetch('https://amirmohammadkomijani.pythonanywhere.com/auth/jwt/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      Navigate('/');
    } else {
    }
  };

  const registerUser = async (values: any) => {
    const reg_response = await fetch('https://amirmohammadkomijani.pythonanywhere.com/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    });
    const reg_data = await reg_response.json();
    if (reg_response.status === 201) {
      Navigate('/login');
    } else {
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    Navigate('/login');
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
