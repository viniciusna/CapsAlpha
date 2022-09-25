import { Context } from '../../context/Context.jsx';
import { useContext, useState } from 'react';
import { Img } from './style.js';
import InputBox from '../../components/InputBox/InputBox.jsx';
import Input from '../../components/Input/Input';
import HalfPage from '../../components/HalfPage/HalfPage.jsx';
import logo from '../../images/LogoVertical.svg';
import Button from '../../components/Button/Button.jsx';
import Error from '../../components/Error/Error';
import Validate from '../../validator/ValidateRegister.js';

const inputHeight = '6vh';
const inputWidth = '30vw';

function Register() {
	const [values, setValues] = useState({});
	const [hover, setHover] = useState(false);
	const [serverError, setServerError] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	let { navigate } = useContext(Context);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setValues((values) => ({ ...values, [name]: value }));
	}

	function handleClick(event) {
		const errors = Validate(values);
		setFormErrors(errors);

		if (Object.keys(errors).length !== 0) return;
		setServerError(false);

		fetch('http://localhost:3001/user/register', {
			method: 'POST',
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
					setServerError(res.message);
					return null;
				}
				navigate('/login');
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<div className="div">
				<HalfPage gap="0em" height="100vh">
					<InputBox title="Registre-se" height="">
						<Input
							label="Email"
							height={inputHeight}
							width={inputWidth}
							error={formErrors.email}
							placeholder="Seu email"
							type="email"
							name="email"
							handleChange={handleChange}
						/>
						<Input
							label="Usuário"
							error={formErrors.name}
							height={inputHeight}
							width={inputWidth}
							type="text"
							name="name"
							handleChange={handleChange}
							placeholder="Seu nome de usuário"
						/>
						<Input
							label="Senha"
							error={formErrors.password}
							height={inputHeight}
							width={inputWidth}
							type="password"
							name="password"
							handleChange={handleChange}
							placeholder="Digite uma senha"
						/>
						<Input
							label="Confirmar Senha"
							error={formErrors.passwordConfirm}
							height={inputHeight}
							width={inputWidth}
							type="password"
							name="passwordConfirm"
							handleChange={handleChange}
							placeholder="Confirme a sua senha"
						/>
						<Button
							onMouseOver={() => setHover(true)}
							onMouseOut={() => setHover(false)}
							colorbg={hover ? '#ffffff' : '#02040A'}
							colorfnt={hover ? 'black' : 'white'}
							value="Cadastrar"
							height="6vh"
							width="31vw"
							onClick={handleClick}
						/>
						<Error error={serverError} />
						<p>
							Você já tem uma conta?{' '}
							<a onClick={() => navigate('/Login')}>Fazer login</a>
						</p>
					</InputBox>
				</HalfPage>
				<HalfPage gap="0em" height="100vh" widthMax="">
					<Img onClick={() => navigate('/')} src={logo} alt="" />
				</HalfPage>
			</div>
		</>
	);
}

export default Register;
