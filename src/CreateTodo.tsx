import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useForm } from "react-hook-form";
import { todoListState } from "./atoms";
interface IForm {
  todo: string;
}
function CreateTodo() {
  //   const [todoList, setTodoList] = useRecoilState(todoListState);
  const setTodoList = useSetRecoilState(todoListState);
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
  return (
    <>
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
      {/* <span>{errors?.todo?.message}</span> */}
    </>
  );
}

export default CreateTodo;
