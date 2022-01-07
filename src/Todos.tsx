import { useRecoilValue, useRecoilState } from "recoil";
import { Categoris, todoListState } from "./atoms";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

function Todos() {
  const [todos, setTodoList] = useRecoilState(todoListState);
  // const todos = useRecoilValue(todoListState);
  //   console.log(errors.todo);

  return (
    <div>
      <h1>To Dos</h1>
      <CreateTodo />
      <hr />

      <h2>To Do</h2>
      <ul>
        {todos.map(
          (todo) =>
            // <TodoList key={todo.id} {...todo} />
            todo.category === Categoris.TO_DO && (
              <TodoList
                key={todo.id}
                text={todo.text}
                id={todo.id}
                category={todo.category}
              />
            )
        )}
      </ul>
      <hr />

      <h2>Doing</h2>
      <ul>
        {todos.map(
          (todo) =>
            // <TodoList key={todo.id} {...todo} />
            todo.category === Categoris.DOING && (
              <TodoList
                key={todo.id}
                text={todo.text}
                id={todo.id}
                category={todo.category}
              />
            )
        )}
      </ul>
      <hr />

      <h2>Done</h2>
      <ul>
        {todos.map(
          (todo) =>
            // <TodoList key={todo.id} {...todo} />
            todo.category === Categoris.DONE && (
              <TodoList
                key={todo.id}
                text={todo.text}
                id={todo.id}
                category={todo.category}
              />
            )
        )}
      </ul>
    </div>
  );
}

export default Todos;
