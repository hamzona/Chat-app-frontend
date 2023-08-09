import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./features/auth/Login";
import DashBoard from "./components/DashBoard";
import RequireAuth from "./components/RequireAuth";
import PresistLogin from "./components/PresistLogin";
import Public from "./components/Public";
import Singup from "./features/auth/Singup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route element={<PresistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path={"/dashboard/:id"} element={<DashBoard />} />
            <Route path={"/dashboard"} element={<DashBoard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
