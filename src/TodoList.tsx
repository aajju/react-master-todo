import React from "react";
import { Categoris, ITodoList, todoListState, todoSelector } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

function TodoList({ text, category, id }: ITodoList) {
  //   const [todos, setTodos] = useRecoilState(todoListState);
  const setTodos = useSetRecoilState(todoListState);
  const [todo, doing, done] = useRecoilValue(todoSelector);
  //   console.log(todo, doing, done);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.value);
    //   console.log(todos, "in onClick");
    const {
      currentTarget: { name },
    } = event;

    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  const onDeleteClick = () => {
    // console.log(event);
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      return [
        ...oldTodos.slice(0, targetIndex),
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  //   console.log(todos);

  return (
    <li>
      <span> {text}</span>
      {category !== Categoris.TO_DO && (
        <button name={Categoris.TO_DO} onClick={onClick}>
          todo
        </button>
      )}
      {category !== Categoris.DOING && (
        <button name={Categoris.DOING} onClick={onClick}>
          doing
        </button>
      )}
      {category !== Categoris.DONE && (
        <button name={Categoris.DONE} onClick={onClick}>
          done
        </button>
      )}
      <button onClick={onDeleteClick}>delete</button>
    </li>
  );
}

export default TodoList;
