import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Board } from '../types';

export const new_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3ODA2ODI2LCJpYXQiOjE2OTc3MjA0MjYsImp0aSI6IjNjOTE0NjMyNDVmMDQ5OGU4YTRlMjdmNDJhYjA1ZTA2IiwidXNlcl9pZCI6MX0.BC1SMVpXogTS8A8thqGHSt0eKtBBIdzybQY6Ofgp_GE';

export const useBoard = (boardId: number) => {
  const queryRs = useQuery<Board, Error>({
    queryKey: ['board', boardId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board/${boardId}`, {
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
