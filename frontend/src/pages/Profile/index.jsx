import { Context } from '../../context/Context.jsx';
import { useContext, useEffect, useState } from 'react';
import HeaderProfile from '../../components/Header/HeaderProfile.jsx';
import HalfPage from '../../components/HalfPage/HalfPage.jsx';
import InputBox from '../../components/InputBox/InputBox.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';

function Profile() {
	const inputHeight = '6vh';
	const inputWidth = '30vw';

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

	useEffect(() => {
		setValues({ name: user?.name, email: user?.email });
	}, [user]);

	function handleClick(event) {
		fetch('http://localhost:3001/user', {
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
		<>
			<HeaderProfile></HeaderProfile>
			<div className="divv">
				<HalfPage height="92vh" justifyContent="center">
					<InputBox title="Editar Perfil" height="80vh">
						<Input
							label="email"
							name="email"
							height={inputHeight}
							width={inputWidth}
							type="email"
							value={values.email}
							handleChange={handleChange}
							placeholder="Seu email"
						></Input>
						<Input
							label="Nome de usuário"
							name="name"
							height={inputHeight}
							width={inputWidth}
							type="text"
							value={values.name}
							//handleChange={handleChange}
							handleChange={handleChange}
							placeholder="Seu nome de usuário"
						></Input>
						<Input
							label="Senha"
							name="password"
							height={inputHeight}
							width={inputWidth}
							type="password"
							handleChange={handleChange}
							placeholder="Digite uma senha"
						></Input>
						<Input
							label="Confirme sua senha"
							name="confirmPassword"
							height={inputHeight}
							width={inputWidth}
							type="password"
							handleChange={handleChange}
							placeholder="Confirme a sua senha"
						></Input>
						<Button
							colorbg="black"
							colorfnt="white"
							value="Atualizar Perfil"
							height="6vh"
							width="31vw"
							onClick={handleClick}
						/>
					</InputBox>
				</HalfPage>
			</div>
		</>
	);
}
export default Profile;
