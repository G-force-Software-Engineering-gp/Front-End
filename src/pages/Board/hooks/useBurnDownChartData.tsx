import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

const useBurnDownChartData = (boardId: string | undefined) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['burndownChartData', boardId],
    queryFn: async () => {
      const response = await fetch(
        `https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart-estimate/${boardId}`,
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

export default useBurnDownChartData;
