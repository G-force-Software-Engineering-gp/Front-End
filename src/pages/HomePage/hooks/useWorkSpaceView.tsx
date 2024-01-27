import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

const useWorkSpaceView = (workspaceId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['workspaceViews', workspaceId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/workspace/${workspaceId}`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ` + authTokens.access,
        },
      });
      const data = await response.json();

      return data;
    },
  });
  return queryRs;
};

export default useWorkSpaceView;
