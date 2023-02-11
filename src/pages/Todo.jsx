import { Fragment, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";
import useTodo from "../hooks/useTodo";

const Todo = () => {
  const navigate = useNavigate();
  const { todoList, postTodo, updateTodo, deleteTodo } = useTodo();

  // 로컬 스토리지 토큰 확인
  const is_token = localStorage.getItem("access_token") ? true : false;

  // 비로그인 상태이면 signin 화면으로
  useEffect(() => {
    if (!is_token) navigate("/signin");
  }, [is_token, navigate]);

  // 로컬스토리지의 엑세스토큰을 삭제함으로써 로그아웃 구현
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/signin");
  };

  return (
    <Fragment>
      <Header>
        <div>TodoList</div>
        <LogoutDiv onClick={logout}>logout</LogoutDiv>
      </Header>
      <TodoForm postTodo={postTodo} />
      <TodoList
        todoList={todoList}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </Fragment>
  );
};

const Header = styled.div`
  border: 1px solid #ddd;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const LogoutDiv = styled.div`
  cursor: pointer;
`;

export default Todo;
