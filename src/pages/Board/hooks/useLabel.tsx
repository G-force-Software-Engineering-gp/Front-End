import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LabelAssign, LabelItems } from '../types';

export const useBoardLabels = () => {
  const { boardId } = useParams();
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<LabelItems, Error>({
    queryKey: ['label', boardId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/board-labels/${boardId}/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ` + authTokens.access,
        },
      });
      if (response.status === 404) {
        return { data: [] };
      }
      const data = await response.json();

      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return queryRs;
};

export const useAssignedLabels = (cardId: number) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryRs = useQuery<LabelAssign, Error>({
    queryKey: ['assignLabel', cardId],
    queryFn: async () => {
      const response = await fetch(BaseURL + `tascrum/card-labels/${cardId}`, {
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
