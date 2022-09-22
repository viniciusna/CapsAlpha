import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

export const Context = createContext({});

export const Provider = (props) => {
	const [user, setUser] = useState();
	const [users, setUsers] = useState([]);
	const [documents, setDocuments] = useState();

	const usersColors = [
		['black', 'white'],
		['grey', 'white'],
		['white', 'black'],
		['black', 'white'],
		['grey', 'white'],
		['white', 'black'],
	];

	function addUser(event) {
		const newUser = user;
		let allUsers = users;
		allUsers.push(newUser);
		setUsers(allUsers);
	}

	const navigate = useNavigate();

	return (
		<Context.Provider
			value={{
				navigate,
				user,
				setUser,
				users,
				setUsers,
				addUser,
				documents,
				setDocuments,
				usersColors,
				logo,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
