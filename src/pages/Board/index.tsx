import Header from '@/components/Header';
import HeaderResponsive from '@/components/HeaderResponsive';
import AuthContext from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { BaseURL } from '../baseURL';
import BoardHeader from './boardHeader';
import ChatBot from './components/chatBot';
import { KanbanBoard } from './components/KanbanBoard';

const Board = () => {
  const { boardId } = useParams();
  const [bg, setbg] = useState();
  let authTokens = useContext(AuthContext)?.authTokens;
  const gettingData = async () => {
    const response = await fetch(BaseURL + `tascrum/board/${boardId}`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ` + authTokens.access,
      },
    });
    const data = await response.json();
    setbg(data?.backgroundimage);
  };
  useEffect(() => {
    gettingData();
  }, []);

  const [appearBot, setAppearBot] = useState(false);

  return (
    <div className="h-[calc(100vh-8.5rem)">
      <Header />
      <HeaderResponsive />
      <BoardHeader appearBot={appearBot} setAppearBot={setAppearBot} />
      <div
        className="flex overflow-x-auto"
        style={{
          backgroundImage: `url(${bg})`,
          minHeight: '83.6vh',
          backgroundSize: 'cover',
        }}
      >
        <Outlet />
      </div>
      <div
        className={`fixed bottom-3 right-3 transform transition-transform duration-300 ease-in-out ${
          appearBot ? '' : 'translate-x-[110%]'
        }`}
      >
        <ChatBot />
      </div>
    </div>
  );
};

export default Board;
