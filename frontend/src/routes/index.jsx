import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MyProjects from "../pages/MyProjects";
import Editor from "../pages/Editor";
import ProtectedRoute from "../routes/protectedRoute";
import getCookie from "../utils/getCookie";

function Router() {
  const user = getCookie("token");
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={
          <Home />
       } />
      <Route path="/MyProjects" element={
        <ProtectedRoute user={user}>
          <MyProjects />
        </ProtectedRoute>
      }/>
      <Route path="/Editor" element={
        // <ProtectedRoute user={user}>
          <Editor />
        // </#ProtectedRoute>
      } />
      <Route path="Editor/:id" element={
        //  <ProtectedRoute user={user}>
          <Editor /> 
        //  </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default Router;
