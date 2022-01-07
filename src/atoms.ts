import { atom, selector, useSetRecoilState } from "recoil";

export const TODOS_KEY = "todoListState";

export enum Categoris {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodoList {
  text: string;
  id: number;
  category: Categoris;
}

export const todoListState = atom<ITodoList[]>({
  key: TODOS_KEY,
  default: JSON.parse(localStorage.getItem(TODOS_KEY) || "[]"),
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoListState);
    // console.log(todos);
    return [
      todos.filter((todo) => todo.category === Categoris.TO_DO),
      todos.filter((todo) => todo.category === Categoris.DOING),
      todos.filter((todo) => todo.category === Categoris.DONE),
    ];
  },
});

// export const toDoSelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDos = get(toDoState);
//     return [
//       toDos.filter((toDo) => toDo.category === "TO_DO"),
//       toDos.filter((toDo) => toDo.category === "DOING"),
//       toDos.filter((toDo) => toDo.category === "DONE"),
//     ];
//   },
// });
