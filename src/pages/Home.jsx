import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/todo");
    return;
  }, [navigate]);
  return <Fragment></Fragment>;
};

export default Home;
