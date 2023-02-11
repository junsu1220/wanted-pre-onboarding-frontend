import { Fragment } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoList = ({ todoList, updateTodo, deleteTodo }) => {
  console.log(todoList);
  return (
    <Fragment>
      <Container>
        {todoList &&
          todoList.map((contents) => (
            <TodoItem
              key={contents.id}
              contents={contents}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  padding: 0 24px;
`;

export default TodoList;
