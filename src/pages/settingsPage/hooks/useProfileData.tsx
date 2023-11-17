import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

interface RootObject {
  id: number;
  occupations: string;
  bio?: any;
  profimage: string;
  birthdate?: any;
  user: User;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export const useProfileData = () => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<RootObject, Error>({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/profile/`, {
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
