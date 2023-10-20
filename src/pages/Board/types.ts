export type Board = {
  id: number;
  title: string;
  workspace: number;
  list: List[];
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
};
