import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";

import LoginFirstPage from "./pages/FirstLoginPage";
import Header from "./components/Header";
import SecondLoginPage from "./pages/SecondLoginPage";
import { BrowserRouter } from "react-router-dom";

const MainPage = () => {
  return <div>MainPage</div>;
};

export default function App() {
  const history = useHistory();

  // Сделал переадресацию, т.к понял что страницы должны иметь пути
  // вида /login/step-1

  useEffect(() => {
    history.push("/login/step-1");
  }, []);
  return (
    <>
      <Header />
      <main className="relative flex flex-col p-4 h-full">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login/step-1" component={LoginFirstPage} />
          <Route path="/login/step-2" component={SecondLoginPage} />
        </Switch>
      </main>
    </>
  );
}
