import { atom, selector, useSetRecoilState } from "recoil";

interface ITodoListState {
  [key: string]: string[];
}

export const todoListState = atom<ITodoListState>({
  key: "todoListState",
  default: {
    todo: ["a", "b", "c"],
    doing: ["d", "e"],
    done: ["f"],
  },
});
