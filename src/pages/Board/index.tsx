import Header from '@/components/Header';
import AuthContext from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardHeader from './boardHeader';
import { KanbanBoard } from './components/KanbanBoard';

const Board = () => {
  const { boardId } = useParams();
  const [bg, setbg] = useState();
  let authTokens = useContext(AuthContext)?.authTokens;
  const gettingData = async () => {
    const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board/${boardId}`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ` + authTokens.access,
      },
    });
    const data = await response.json();
    setbg(data?.backgroundImage);
  };
  useEffect(() => {
    gettingData();
  }, []);

  return (
    <div className="h-[calc(100vh-8.5rem)">
      <Header />
      <BoardHeader />
      <div
        className="flex overflow-x-auto"
        style={{
          backgroundImage: `url(${bg})`,
          minHeight: '83.6vh',
          backgroundSize: 'cover',
        }}
      >

        <KanbanBoard />
      </div>
    </div>
  );
};

export default Board;
