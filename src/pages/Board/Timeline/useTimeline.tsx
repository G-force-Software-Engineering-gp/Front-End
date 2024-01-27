import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Board } from '../types';

export const useTimeline = (boardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['Timeline', boardId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/member-tl/${boardId}/`, {
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
