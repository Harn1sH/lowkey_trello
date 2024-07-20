import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className={"h-screen "}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Layout />}>
              <Route path={"/"} element={<Home />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"*"} element={<Navigate to={"/"} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;
