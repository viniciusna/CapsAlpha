import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Editor from '../pages/Editor';
import Profile from '../pages/Profile';
import ProtectedRoute from '../routes/protectedRoute';
import { getCookie } from '../utils/cookie';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
function Router() {
	const { user, setUser, documents, setDocuments } = useContext(Context);
	useEffect(() => {
		const userToken = getCookie('token');
		if (userToken && !user) {
			fetch('https//www.capsalpha.live:3001/user/me', {
				method: 'GET',
				credentials: 'include',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res.message !== 'Success') {
						return null;
					}
					setUser(res.data.user);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/Register" element={<Register />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/Home" element={<Home />} />
			<Route
				path="/Profile"
				element={
					<ProtectedRoute user={getCookie('token')}>
						<Profile />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/Editor"
				element={
					<ProtectedRoute user={getCookie('token')}>
						<Editor />
					</ProtectedRoute>
				}
			/>
			<Route
				path="Editor/:documentId"
				element={
					<ProtectedRoute user={getCookie('token')}>
						<Editor />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default Router;
