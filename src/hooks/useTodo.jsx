import { useEffect, useState } from "react";
import api from "../shared/api";

export default function useTodo() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const response = async () =>
      await api.get("/todos").then(({ data }) => setTodoList([...data]));
    response();
  }, []);

  const postTodo = async (todo) => {
    const { data } = await api.post("/todos", { todo });
    setTodoList([...todoList, data]);
  };

  const updateTodo = async (id, todo, isCompleted) => {
    const { data } = await api.put(`/todos/${id}`, {
      todo,
      isCompleted,
    });

    setTodoList(
      todoList.map((todo) =>
        todo.id === data?.id
          ? { ...todo, todo: data.todo, isCompleted: data.isCompleted }
          : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return { todoList, postTodo, updateTodo, deleteTodo };
}
