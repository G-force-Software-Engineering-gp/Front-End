import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { List } from '../types';
import { new_token } from './useBoard';

export const useList = (listId: number) => {
  const queryRs = useQuery<List, Error>({
    queryKey: ['list', listId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/list/${listId}`, {
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
