import { AuthProvider } from '@/contexts/AuthContext';
import { Route, Routes } from 'react-router-dom';
import Board from './Board';
import Home from './HomePage/Home';
import Login from './loginSignup/Login';
import Register from './loginSignup/Register';
import PrivateRoute from './PrivateRoute';
import Settings from './settingsPage';
import Profile from './settingsPage/profile';

const Router = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Router;
