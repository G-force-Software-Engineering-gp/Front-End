import React from 'react'
import { BoardSidebar } from './boardSidebar'
import BoardHeader from './boardHeader'

const Board = () => {
  return (
    <div>
      <BoardHeader />
      <div className="grid grid-flow-col grid-cols-4 justify-center justify-items-center ">
        <div className=" col-span-1">
          <BoardSidebar />
        </div>
        <div className=" col-span-3 p-5">
          <p>WorkSpaces</p>
        </div>
      </div>
    </div>
  )
}

export default Board
