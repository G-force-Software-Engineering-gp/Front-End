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
};

export type Assignee = {
  id: number;
  user: User;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
};
