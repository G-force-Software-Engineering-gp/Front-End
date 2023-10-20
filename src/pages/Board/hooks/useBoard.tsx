import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Board } from '../types';

export const useBoard = (boardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<Board, Error>({
    queryKey: ['board', boardId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board/${boardId}`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ` + authTokens,
        },
      });
      const data = await response.json();

      return data;
    },
  });
  return queryRs;
};
