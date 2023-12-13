import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

export const useBurnDownFooter = (boardId: string | undefined) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['burndownFooter', boardId],
    queryFn: async () => {
      const response = await fetch(
        `https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart-sum/${boardId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `JWT ` + authTokens.access,
          },
        }
      );
      const data = await response.json();
      return data;
    },
  });
  return queryRs;
};
