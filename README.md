import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  };

  const registerUser = async (values: any) => {
  };


  const logoutUser = () => {
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
