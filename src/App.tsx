import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NewInvestment from "./pages/NewInvestment";
import UnderConstruction from "./pages/UnderConstruction";
import { ROUTES_PATHS } from "./constants";

const { LOGIN, NEW_INVESTMENT, FORGOT_PASSWORD } = ROUTES_PATHS;

function App() {
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />
      <Route path={NEW_INVESTMENT} element={<NewInvestment />} />
      <Route path={FORGOT_PASSWORD} element={<UnderConstruction />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
