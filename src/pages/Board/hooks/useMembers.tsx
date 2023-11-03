import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Member, Members, User } from '../types';

export const useMembers = (boardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<Members, Error>({
    queryKey: ['members', boardId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board-member/${boardId}/`, {
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
