import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NewInvestment from "./pages/NewInvestment";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/new-investment' element={<NewInvestment />} />
    </Routes>
  );
}

export default App;
