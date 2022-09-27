import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import InputBox from '../../components/InputBox/InputBox.jsx';
import Input from '../../components/Input/Input';
import HalfPage from '../../components/HalfPage/HalfPage.jsx';
import logo from '../../images/LogoVertical.svg';
import Button from '../../components/Button/Button.jsx';
import Error from '../../components/Error/Error';
import { Context } from '../../context/Context.jsx';
import Validate from '../../validator/ValidateLogin.js';

const inputHeight = '6vh';
const inputWidth = '30vw';

function Login() {
	const [values, setValues] = useState({});
	const [hover, setHover] = useState(false);
	const [serverError, setServerError] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const navigate = useNavigate();
	const { user, setUser, documents, setDocuments } = useContext(Context);

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

		fetch('http://localhost:3001/user/login', {
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
				setUser(res.data.user);
				setDocuments(res.data.documents);
				navigate('/home');
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<div className="div">
				<HalfPage gap="0em" height="100vh" justifyContent="center">
					<InputBox title="Fazer Login" height="">
						<Input
							label="Email"
							error={formErrors.email}
							height={inputHeight}
							width={inputWidth}
							type="email"
							name="email"
							handleChange={handleChange}
							placeholder="Seu email"
						/>
						<Input
							error={formErrors.password}
							label="Senha"
							name="password"
							height={inputHeight}
							width={inputWidth}
							type="password"
							handleChange={handleChange}
							placeholder="Digite uma senha"
						/>
						<Button
							onClick={handleClick}
							onMouseOver={() => setHover(true)}
							onMouseOut={() => setHover(false)}
							colorbg={hover ? '#ffffff' : '#02040A'}
							colorfnt={hover ? 'black' : 'white'}
							value="Logar"
							height="6vh"
							width="31vw"
						/>
						<Error error={serverError} />
						<p>
							Crie sua conta.{' '}
							<a onClick={() => navigate('/Register')}>Registrar-se</a>
						</p>
					</InputBox>
				</HalfPage>
				<HalfPage gap="0em" height="100vh" justifyContent="center">
					<img className='logo-v' onClick={() => navigate('/')} src={logo} alt="" />
				</HalfPage>
			</div>
		</>
	);
}

export default Login;
