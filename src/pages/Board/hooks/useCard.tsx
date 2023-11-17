import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Card } from '../types';

export const useCard = (cardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<Card, Error>({
    queryKey: ['card', cardId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/card/${cardId}?board_id`, {
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
