import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import React from 'react';
import { useParams } from 'react-router-dom';
import useWorkSpaceBoards from '../hooks/useWorkSpaceBoards';
import AddBoard from './AddBoard';
import BoardCard from './BoardCard';


const WorkSpacePageDetails = () => {
  const { workspaceId } = useParams();
  const { data } = useWorkSpaceBoards(parseInt(workspaceId ? workspaceId : ''));
  return (

    <div className="mb-8 mt-4 grid auto-rows-fr gap-2 sm:grid-cols-2 md:grid-cols-3">
      {data?.boards.map((item1: { id: number; title: string; backgroundImage: any; has_star: boolean }) => (
        <BoardCard
          key={item1.id} // Make sure to include a key prop if the list is dynamic
          id={item1.id}
          title={item1.title}
          backgroundImage={item1.backgroundImage}
          has_star={item1.has_star}
        />
      ))}

      <AddBoard workspaceId={data?.id} />
    </div>
  );
};

export default WorkSpacePageDetails;
