import { atom, selector, useSetRecoilState } from "recoil";

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
    todo: [
      { id: 1, todo: "hello" },
      { id: 2, todo: "hi" },
    ],
    doing: [],
    done: [],
  },
});
