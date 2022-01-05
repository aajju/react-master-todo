import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

interface ITodoList {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const todoListState = atom<ITodoList[]>({
  key: "todoListState",
  default: [],
});

function Todos() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ todo }: IForm) => {
    setTodoList((oldToDos) => [
      { text: todo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("todo", "");
  };
  console.log(todoList, "todolist");

  //   console.log(errors.todo);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", {
            required: "todo is required",
            minLength: {
              value: 5,
              message: "Your todo is too short.",
            },
          })}
          placeholder="text"
        />
        <button>submit</button>
      </form>
      <span>{errors?.todo?.message}</span>
      <div>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
