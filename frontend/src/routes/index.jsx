import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyProjects from "../pages/MyProjects";
import Prototype from "../pages/Prototype";
import Editor from "../pages/Editor";

function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MyProjects" element={<MyProjects />} />
      <Route path="/Editor" element={<Editor />} />
      <Route path="/Prototype" element={<Prototype />} />

    </Routes>
  );
}

export default Router;
