import { useSetRecoilState, useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Categoris, todoListState, TODOS_KEY } from "./atoms";
import { useEffect } from "react";
interface IForm {
  todo: string;
}
function CreateTodo() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  //   const setTodoList = useSetRecoilState(todoListState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ todo }: IForm) => {
    let idNow = Date.now();
    setTodoList((oldToDos) => [
      { text: todo, id: idNow, category: Categoris.TO_DO },
      ...oldToDos,
    ]);
    setValue("todo", "");
  };

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
  }, [todoList]);
  //   console.log(todoList, "submit");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo")} placeholder="text" />
        <button>submit</button>
      </form>
      {/* <span>{errors?.todo?.message}</span> */}
    </>
  );
}

export default CreateTodo;
