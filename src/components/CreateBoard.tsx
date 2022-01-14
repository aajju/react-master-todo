import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodoListState, todoListState } from "../atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.form`
  /* width: 100px; */
  background-color: rebeccapurple;
  /* height: 100px; */
`;

function CreateBoard() {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ITodoListState>();

  const onSubmit = ({ data }: ITodoListState) => {
    setTodoList((oldBoards) => {
      return {
        ...oldBoards,
        [data]: [],
      };
    });

    setValue("data", []);
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <input {...register("data")} type="text" placeholder="add a board..." />
    </Wrapper>
  );
}
export default CreateBoard;
