import Header from '@/components/Header';
import AuthContext from '@/contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardHeader from './boardHeader';
import { BoardSidebar } from './boardSidebar';
import { KanbanBoard } from './components/KanbanBoard';

// import React from 'react';
// import BoardHeader from './boardHeader';
// import { BoardSidebar } from './boardSidebar';

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
  console.log(bg);

  return (
    <div className="h-[calc(100vh-8.5rem)">
      <Header />
      <BoardHeader />
      <div
        className="flex justify-center "
        style={{
          backgroundImage: `url(${bg})`,
          // backgroundColor: 'rgba(255, 255, 255, 0.7)',
          // opacity: '50%',
          minHeight: '83.6vh',
          backgroundSize: 'cover',
        }}
      >

        {/* <div className="absolute inset-0 z-10 bg-opacity-50"></div> */}
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Board;
