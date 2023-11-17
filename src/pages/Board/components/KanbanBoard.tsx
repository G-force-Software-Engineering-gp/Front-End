import { useParams } from 'react-router-dom';
import { useBoard } from '../hooks/useBoard';
import { useMembers } from '../hooks/useMembers';
import { BoardList } from './BoardList';
import CreateListModal from './CreateListModal';

export const KanbanBoard = () => {
  const { boardId } = useParams();
  const { data } = useBoard(parseInt(boardId ? boardId : ''));
  return (
    <>
      <div>
        <div className="duration-[.25s] flex w-full items-start space-x-4 overflow-x-auto overflow-y-hidden p-5 transition-all ">
          {data?.list.map((list) => (
            <>
              <BoardList listId={list.id} columns={data.list} boardId={data.id} />
            </>
          ))}
          <div className=" relative flex max-h-full w-72 shrink-0 flex-col justify-center py-2">
            {data !== undefined && <CreateListModal boardId={data.id} />}
          </div>
        </div>
      </div>
    </>
  );
};
