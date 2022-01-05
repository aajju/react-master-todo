import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodoList, todoListState } from "./atoms";

function TodoList({ text }: ITodoList) {
  //   const todo = useRecoilValue(todoListState);
  return (
    <li>
      <span> {text}</span>
      <button>todo</button>
      <button>doing</button>
      <button>done</button>
    </li>
  );
}

export default TodoList;
