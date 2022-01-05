import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { todoListState } from "./atoms";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

function Todos() {
  //   const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoList = useRecoilValue(todoListState);
  //   console.log(errors.todo);

  return (
    <div>
      <CreateTodo />
      <div>
        <ul>
          {todoList.map((todo) => (
            <TodoList key={todo.id} {...todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
