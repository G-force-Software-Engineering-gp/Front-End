import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

export const useTimelineEnd = (boardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['Timeline End', boardId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/boards/${boardId}/due-tl/`, {
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
