import { Fragment, useState } from "react";
import styled from "styled-components";

const TodoItem = ({ contents, updateTodo, deleteTodo }) => {
  console.log(contents);
  const { id, isCompleted, todo } = contents;
  const [modifyToggle, setModifyToggle] = useState(false);
  const [editTodo, setEditTodo] = useState(todo);

  const handleUpdate = async (id, todo, isCompleted) => {
    if (!editTodo) {
      alert("할 일을 입력해 주세요");
      return;
    }
    updateTodo(id, todo, isCompleted);
    setModifyToggle((props) => !props);
  };

  const handleDelete = async (id) => {
    deleteTodo(id);
  };

  const handleDone = async (id, todo, isCompleted) => {
    updateTodo(id, todo, isCompleted);
  };

  const handleCancel = () => {
    setEditTodo(todo);
    setModifyToggle((props) => !props);
  };

  return (
    <StLi>
      <Container>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleDone(id, todo, !isCompleted)}
          />
          {modifyToggle ? (
            <Fragment>
              <StInput
                data-testid="modify-input"
                type="text"
                value={editTodo}
                autoFocus
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <StButton
                onClick={() => handleUpdate(id, editTodo, isCompleted)}
                data-testid="submit-button"
              >
                제출
              </StButton>
              <StButton
                onClick={() => handleCancel()}
                data-testid="cancel-button"
              >
                취소
              </StButton>
            </Fragment>
          ) : (
            <Fragment>
              <StSpan onClick={(e) => e.preventDefault()}>{todo}</StSpan>
              <StButton
                onClick={() => {
                  setModifyToggle((props) => !props);
                }}
                data-testid="modify-button"
              >
                수정
              </StButton>
              <StButton
                onClick={() => handleDelete(id)}
                data-testid="delete-button"
              >
                삭제
              </StButton>
            </Fragment>
          )}
        </label>
      </Container>
    </StLi>
  );
};

const StLi = styled.li`
  list-style: none;
`;

const Container = styled.div`
  width: 270px;
  border: 4px solid teal;
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-bottom: 10px;
`;

const StInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
  margin-bottom: 5px;
`;

const StSpan = styled.span`
  display: flex;
  align-items: center;
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
  margin-bottom: 5px;
`;

const StButton = styled.button`
  border: none;
  width: 50%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
`;

export default TodoItem;
