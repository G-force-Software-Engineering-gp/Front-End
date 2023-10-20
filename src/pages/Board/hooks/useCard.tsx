import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Card } from '../types';
import { new_token } from './useBoard';

export const useCard = (cardId: number) => {
  const queryRs = useQuery<Card, Error>({
    queryKey: ['card', cardId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/card/${cardId}`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ` + new_token,
        },
      });
      const data = await response.json();

      return data;
    },
  });
  return queryRs;
};
