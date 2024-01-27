import React from 'react'
import { useParams } from 'react-router';
import useWorkSpaceView from './hooks/useWorkSpaceView';

const WorkSpaceView = () => {
  const { workspaceId } = useParams();
  const { data } = useWorkSpaceView(parseInt(workspaceId ? workspaceId : ''));
  return (
    <div>WorkSpaceView</div>
  )
}

export default WorkSpaceView