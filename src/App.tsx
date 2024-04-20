import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NewInvestment from "./pages/NewInvestment";
import UnderConstruction from "./pages/UnderConstruction";
import { ROUTES_PATHS } from "./constants";
import Layout from "./components/UI/Layout";

const { LOGIN, NEW_INVESTMENT, FORGOT_PASSWORD, LEARN_MORE } = ROUTES_PATHS;

function App() {
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />
      <Route path={NEW_INVESTMENT} element={<Layout />}>
        <Route path={NEW_INVESTMENT} element={<NewInvestment />} />
      </Route>
      <Route path={FORGOT_PASSWORD} element={<UnderConstruction />} />
      <Route path={LEARN_MORE} element={<UnderConstruction />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
