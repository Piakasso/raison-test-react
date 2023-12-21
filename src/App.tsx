import { useEffect } from "react";
import { Route, useHistory } from "react-router";

import LoginFirstPage from "./pages/FirstLoginPage";
import Header from "./components/Header";
import SecondLoginPage from "./pages/SecondLoginPage";

export default function App() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col p-4 h-full">
        <Route path="/" component={LoginFirstPage} />
        <Route path="/login/step-2" component={SecondLoginPage} />
      </main>
    </>
  );
}
