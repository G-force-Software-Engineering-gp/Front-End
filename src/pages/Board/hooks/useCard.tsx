import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../types';

export const useCard = (cardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const { boardId } = useParams();
  const parsedBoardId = parseInt(boardId ? boardId : '');
  const queryRs = useQuery<Card, Error>({
    queryKey: ['card', cardId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/card/${cardId}/?board=${parsedBoardId}`, {
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
