import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

interface RootObject {
  id: number;
  title: string;
  backgroundImage: string;
  has_star: boolean;
}

export const useRecentlyViewed = () => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<RootObject, Error>({
    queryKey: ['recently-viewed'],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/recentlyviewed/`, {
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
