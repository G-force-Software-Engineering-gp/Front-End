import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { List } from '../types';

export const useList = (listId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<List, Error>({
    queryKey: ['list', listId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/list/${listId}`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ` + authTokens?.access,
        },
      });
      const data = await response.json();
      return data;
    },
  });
  return queryRs;
};
