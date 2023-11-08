import internal from 'stream';

export type Board = {
  id: number;
  title: string;
  workspace: number;
  list: List[];
  backgroundImage: any;
};

export type List = {
  id: number;
  title: string;
  board?: number;
  card?: Card[];
};

export type Card = {
  id: number;
  title: string;
  list?: number;
  members?: Assignee[];
  startdate?: null;
  duedate?: '2023-10-29T00:00:00Z';
  reminder?: '1 Day before';
};

export type Assignee = Member;

export type Members = {
  id: number;
  members: Assignee[];
};

export type Member = {
  id: number;
  user: User;
  profimage?: string;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
};
