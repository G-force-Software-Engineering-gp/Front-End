import React from 'react';
import BoardHeader from './boardHeader';
import { BoardSidebar } from './boardSidebar';
import { KanbanBoard } from './components/KanbanBoard';
import Header from '@/components/Header';
// import React from 'react';
// import BoardHeader from './boardHeader';
// import { BoardSidebar } from './boardSidebar';




const Board = () => {
  return (
    <div className="h-[calc(100vh-8.5rem)">
      <Header />
      <BoardHeader />
      <div className="grid  grid-flow-col grid-cols-5 justify-center">
        <div className=" col-span-1">
          <BoardSidebar />
        </div>
        <div className=" col-span-4 flex  flex-grow flex-col pt-2 pt-5">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default Board;
