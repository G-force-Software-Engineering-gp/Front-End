import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

export const useTimelineStart = (boardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['Timeline Start', boardId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/boards/${boardId}/start-tl/`, {
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
