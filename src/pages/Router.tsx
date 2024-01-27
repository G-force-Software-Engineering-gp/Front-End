import { AuthProvider } from '@/contexts/AuthContext';
import { Route, Routes } from 'react-router-dom';
import Board from './Board';
import BurnDownPage from './Board/BurnDownPage';
import Calendar from './Board/calendar';
import BasicTable from './Board/components/BasicTable';
import BurnDownChart from './Board/components/BurnDownChart';
import { KanbanBoard } from './Board/components/KanbanBoard';
import Timeline from './Board/Timeline/Timeline';
import WorkSpacePageDetails from './HomePage/components/WorkSpacePageDetails';
import Home from './HomePage/Home';
import WorkSpaceMembers from './HomePage/WorkSpaceMembers';
import WorkSpacePage from './HomePage/WorkSpacePage';
import Login from './loginSignup/Login';
import Register from './loginSignup/Register';
import PrivateRoute from './PrivateRoute';
import Settings from './settingsPage';
import Advanced from './settingsPage/advanced';
import Cards from './settingsPage/cards';
import Profile from './settingsPage/profile';
import WorkSpsceSettings from './HomePage/WorkSpsceSettings';
import WorkSpaceHighlights from './HomePage/WorkSpaceHighlights';
import WorkSpaceView from './HomePage/WorkSpaceView';

const Router = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/board/:boardId" element={<Board />}>
              <Route index element={<KanbanBoard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="timeline" element={<Timeline />} />
            </Route>
            <Route path="/board/:boardId/burndown" element={<BurnDownPage />} />
            <Route path="/workspace/:workspaceId" element={<WorkSpacePage />}>
              <Route index path="boards" element={<WorkSpacePageDetails />} />
              <Route path="members" element={<WorkSpaceMembers />} />
              <Route path="setting" element={<WorkSpsceSettings />} />
              <Route path="highlight" element={<WorkSpaceHighlights />} />
              <Route path="view" element={<WorkSpaceView />} />
            </Route>
            <Route
              path="/burndown"
              element={
                <div className="flex overflow-x-auto">
                  <BurnDownChart />
                </div>
              }
            />
            <Route path="/settings" element={<Settings />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cards" element={<Cards />} />
              <Route path="advanced" element={<Advanced />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Router;
