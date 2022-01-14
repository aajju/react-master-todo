import { atom } from "recoil";

export interface ITodo {
  id: number;
  todo: string;
}

interface ITodoListState {
  [key: string]: ITodo[];
}

export const todoListState = atom<ITodoListState>({
  key: "todoListState",
  default: {
    todo: [],
    doing: [],
    done: [],
  },
});
