import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MyProjects from "../pages/MyProjects";
import Editor from "../pages/Editor";
import Profile from "../pages/Profile";
import ProtectedRoute from '../routes/protectedRoute'
import getCookie from "../utils/getCookie";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
function Router() {
  const { user, setUser} = useContext(Context);

  useEffect(()=>{
    const userToken = getCookie("token");
    if(userToken && !user){
      fetch('http://localhost:3001/user/me', {
        method: 'GET',  
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.message !== 'Success') {
            return null
          }
          setUser(res.data.user)
        })
        .catch(err => console.log(err));
    }
  },[])

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
        <Route path="/Profile" element={
        // <ProtectedRoute user={user}>
          <Profile />
        // </ProtectedRoute>
      }/>
   
      <Route path="/Editor" element={
        // <ProtectedRoute user={user}>
          <Editor />
        // </#ProtectedRoute>
      } />
      <Route path="Editor/:documentId" element={
        //  <ProtectedRoute user={user}>
          <Editor /> 
        //  </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default Router;
