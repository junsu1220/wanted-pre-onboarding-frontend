import { useState } from "react";
import styled from "styled-components";

const TodoForm = ({ postTodo }) => {
  const initialState = {
    id: 0,
    todo: "",
    isCompleted: false,
    userId: 0,
  };
  const [todo, setTodo] = useState(initialState);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (todo.todo.trim() === "") return;
    postTodo(todo.todo);
    setTodo(initialState);
  };

  return (
    <StForm onSubmit={onSubmitHandler} className="add-form">
      <label>
        <StInput
          type="text"
          name="todo"
          value={todo.todo}
          onChange={onChangeHandler}
          data-testid="new-todo-input"
          autoFocus
        />
      </label>
      <StButton type="submit" data-testid="new-todo-add-button">
        추가
      </StButton>
    </StForm>
  );
};

const StForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const StInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const StButton = styled.button`
  border: none;
  height: 40px;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;

export default TodoForm;
