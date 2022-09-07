import { Context } from "../../context/Context.jsx";
import { useContext, useState } from "react";
import InputBox from "../../components/InputBox/InputBox.jsx"
import Input from "../../components/Input/Input";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import logo from "../../images/LogoVertical.svg";
import Button from "../../components/Button/Button.jsx";
import Error from '../../components/Error/Error'

const inputHeight = "6vh"
const inputWidth = "30vw"

function Register() {
  const [values, setValues] = useState({});
  const [error, setError] = useState("")
  let { navigate } = useContext(Context);

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    setValues(values => ({...values, [name]: value}));
  }

  function handleClick (event) {
    fetch('http://localhost:3001/user/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.message != 'Success') {
          setError(res.message)
          return null
        }
        navigate('/login')
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      <div className="divv">
        <HalfPage gap="0em" height="100vh">
          <InputBox title="Registre-se" height="92vh">
            <Input
              label="Email"
              height={inputHeight}
              width={inputWidth}
              placeholder="Seu email"
              type="email"
              name='email'
              handleChange={handleChange}
/>
            <Input
              label="Usuário"
              height={inputHeight}
              width={inputWidth}
              type="text"
              name='name'
              handleChange={handleChange}
              placeholder="Seu nome de usuário"
            />
            <Input
              label="Senha"
              height={inputHeight}
              width={inputWidth}
              type="password"
              name='password'
              handleChange={handleChange}
              placeholder="Digite uma senha"
            />
            <Input
              label="Confirmar Senha"
              height={inputHeight}
              width={inputWidth}
              type="password"
              name='passwordConfirm'
              handleChange={handleChange}
              placeholder="Confirme a sua senha"
            />
            <Button
              colorbg="#000000"
              colorfnt="#FFFFFF"
              value="Cadastrar"
              height="6vh"
              width="31vw"
              onClick={handleClick} 
        />
           <Error error={error}/>
            <p>
              Você já tem uma conta?{" "}
              <a onClick={() => navigate("/Login")}>Fazer login</a>
            </p>
          </InputBox>
        </HalfPage>
        <HalfPage gap="0em" height="100vh">
          <img onClick={() => navigate("/")} src={logo} alt="" />
        </HalfPage>
      </div>
    </>
  );
}

export default Register;
