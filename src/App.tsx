import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoListState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);

  // Object.keys(todos).map((abc) => console.log(abc));
  const onDragEnd = (event: DropResult) => {
    console.log(event);
    const { draggableId, source, destination } = event;
    if (!destination) return;
    // moved in same board
    if (destination.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]];
        const grabObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination.index, 0, grabObj);
        return {
          ...allBoards,
          [destination.droppableId]: copyBoard,
        };
      });
    }

    // moved to another board
    if (destination.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const grabObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, grabObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board key={boardId} todos={todos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
