import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LabelItems } from '../types';

export const useBoardLabels = () => {
  const { boardId } = useParams();
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<LabelItems, Error>({
    queryKey: ['label', boardId],
    queryFn: async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board-labels/${boardId}`, {
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

// export const useLabel = () => {
//   const { boardId } = useParams();
//   let authTokens = useContext(AuthContext)?.authTokens;
//   const queryRs = useQuery<LabelItems, Error>({
//     queryKey: ['label', boardId],
//     queryFn: async () => {
//       const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board-labels/${boardId}`, {
//         method: 'GET',
//         headers: {
//           Authorization: `JWT ` + authTokens.access,
//         },
//       });
//       const data = await response.json();

//       return data;
//     },
//   });
//   return queryRs;
// };
