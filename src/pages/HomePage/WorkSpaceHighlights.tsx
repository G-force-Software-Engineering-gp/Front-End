import React from 'react'
import { useParams } from 'react-router';
import useWorkSpaceHighlight from './hooks/useWorkSpaceHighlight';

const WorkSpaceHighlights = () => {
  const { workspaceId } = useParams();
  const { data } = useWorkSpaceHighlight(parseInt(workspaceId ? workspaceId : ''));
  return (
    <div>WorkSpaceHighlights</div>
  )
}

export default WorkSpaceHighlights