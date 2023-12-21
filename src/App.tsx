import { Route, Switch } from "react-router";

import LoginFirstPage from "./pages/FirstLoginPage";
import Header from "./components/Header";
import SecondLoginPage from "./pages/SecondLoginPage";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="relative flex flex-col p-4 h-full">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login/step-1" component={LoginFirstPage} />
          <Route path="/login/step-2" component={SecondLoginPage} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}
