import { useEffect } from "react";
import { useHistory } from "react-router";

const MainPage = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/login/step-1");
  }, []);
  return <>MainPage</>;
};

export default MainPage;
