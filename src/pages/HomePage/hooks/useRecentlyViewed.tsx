import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useRecentlyViewed = () => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery({
    queryKey: ['recently-viewed'],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/recentlyviewed/`, {
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
