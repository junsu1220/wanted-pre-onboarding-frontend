import { Fragment, useEffect } from "react";
import "./App.css";
import loadable from "@loadable/component";
import Loader from "./elements/Loader";
import GlobalStyle from "./shared/GlobalStyle";
import { Routes, Route } from "react-router-dom";

function App() {
  // 코드 스플리팅을 위한 loadable 설정
  const Home = loadable(() => import("./pages/Home"), { fallback: <Loader /> });
  const Signin = loadable(() => import("./pages/Signin"), {
    fallback: <Loader />,
  });
  const Signup = loadable(() => import("./pages/Signup"), {
    fallback: <Loader />,
  });
  const Todo = loadable(() => import("./pages/Todo"), { fallback: <Loader /> });
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Fragment>
  );
}

export default App;
