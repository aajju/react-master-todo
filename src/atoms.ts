import { atom } from "recoil";
export interface ITodoList {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
export const todoListState = atom<ITodoList[]>({
  key: "todoListState",
  default: [],
});
