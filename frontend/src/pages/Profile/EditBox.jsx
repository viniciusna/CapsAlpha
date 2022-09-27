import InputBox from '../../components/InputBox/InputBox.jsx';
import Input from '../../components/Input/Input';
import HalfPage from '../../components/HalfPage/HalfPage.jsx';
import Button from '../../components/Button/Button.jsx';
import Error from '../../components/Error/Error';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/Context.jsx';
import * as S from './style';
import { user } from '../../components/UserIdentifier/style.js';
const inputHeight = '6vh';
const inputWidth = '30vw';

export default function EditBox() {
	const [error, setError] = useState('');
	const { user, setUser, documents, setDocuments } = useContext(Context);
	let { navigate } = useContext(Context);
	const [values, setValues] = useState({
		name: user?.name,
		email: user?.email,
	});

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setValues((values) => ({ ...values, [name]: value }));
	}

	function handleClick(event) {
		fetch('https://www.capsalpha.live:3001/user', {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify(values),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.message !== 'Success') {
					setError(res.message);
					return null;
				}
				alert('Update success');
			})
			.catch((err) => console.log(err));
	}

	return (
		<InputBox title="Editar Perfil" height="">
			<Input
				label="Email"
				height={inputHeight}
				width={inputWidth}
				placeholder="Seu email"
				type="email"
				name="email"
				value={user?.email}
				handleChange={handleChange}
			/>
			<Input
				label="Usuário"
				height={inputHeight}
				width={inputWidth}
				type="text"
				name="name"
				value={user?.name}
				handleChange={handleChange}
				placeholder="Seu nome de usuário"
			/>
			<Input
				label="Senha"
				height={inputHeight}
				width={inputWidth}
				type="password"
				name="password"
				handleChange={handleChange}
				placeholder="Digite uma senha"
			/>
			<Input
				label="Confirmar Senha"
				height={inputHeight}
				width={inputWidth}
				type="password"
				name="passwordConfirm"
				handleChange={handleChange}
				placeholder="Confirme a sua senha"
			/>
			<Button
				colorbg="#000000"
				colorfnt="#FFFFFF"
				value="Atualizar"
				height="6vh"
				width="31vw"
				onClick={handleClick}
			/>
			<Error error={error} />
		</InputBox>
	);
}
