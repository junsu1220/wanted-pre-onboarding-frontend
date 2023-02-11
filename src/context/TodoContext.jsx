import { createContext, useReducer } from "react";

export const dispatchContext = createContext("");
export const todoContext = createContext("");

const initialTodos = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return [...action.initialTodos];
    case "ADD":
      return [...state, action.todo];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.todo.id ? { ...action.todo } : todo
      );
    default:
      return state;
  }
};

export default function TodoContextWrapper(props) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <todoContext.Provider value={todos}>
      <dispatchContext.Provider value={dispatch}>
        {props.children}
      </dispatchContext.Provider>
    </todoContext.Provider>
  );
}
