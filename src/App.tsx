import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NewInvestment from "./pages/NewInvestment";
import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/new-investment' element={<NewInvestment />} />
      <Route path='/forgot-password' element={<UnderConstruction />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
