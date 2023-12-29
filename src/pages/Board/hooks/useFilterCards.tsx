import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, LabelItem, LabelItems, Member } from '../types';

export const useFilterCards = (keyVal: any, Assignees: Member[], Labels: LabelItem[], onSuccess: any) => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const { boardId } = useParams();
  const parsedBoardId = parseInt(boardId ? boardId : '');
  const queryRs = useQuery<Card[], Error>({
    queryKey: ['fileters', parsedBoardId, keyVal],
    queryFn: async () => {
      const paramsAssignees = Assignees?.filter((obj) => obj.checked === true)
        ?.map((item) => 'members=' + item.id)
        .join('&');
      const paramsLabels = Assignees?.filter((obj) => obj.checked === true)
        ?.map((item) => 'labels=' + item.id)
        .join('&');
      let finalParams = '';
      if (paramsAssignees !== '' && paramsLabels !== '') {
        finalParams = '?' + paramsAssignees + '&' + paramsLabels;
      } else if (paramsAssignees !== '') {
        finalParams = '?' + paramsAssignees;
      } else if (paramsLabels !== '') {
        finalParams = '?' + paramsLabels;
      }
      if (finalParams.length === 0) {
        return [];
      }
      const response = await fetch(BaseURL + `tascrum/boards/${parsedBoardId}/filter-board/${finalParams}`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ` + authTokens.access,
        },
      });
      const data = await response.json();

      return data;
    },
    onSuccess: onSuccess,
  });
  return queryRs;
};
