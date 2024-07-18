import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <div className={"h-screen overflow-hidden"}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
