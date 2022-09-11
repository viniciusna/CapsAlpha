import { Context } from "../../context/Context.jsx";
import { useContext, useState } from "react";
import InputBox from "../../components/InputBox/InputBox.jsx";
import Input from "../../components/Input/Input";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import logo from "../../images/LogoVertical.svg";
import Button from "../../components/Button/Button.jsx";
import Error from '../../components/Error/Error'

const inputHeight = "6vh";
const inputWidth = "30vw";

function Login() {
  const [values, setValues] = useState({});
  const [error, setError] = useState("")
  let { navigate } = useContext(Context);

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    setValues(values => ({...values, [name]: value}));
  }

  function handleClick (event) {
    fetch('http://localhost:3001/user/login', {
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
        navigate('/home')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <div className="div">
        <HalfPage gap="0em" height="100vh">
          <InputBox title="Fazer Login" height="65vh">
              <Input
                label="Email"
                height={inputHeight}
                width={inputWidth}
                type="email"
                name='email'
                handleChange={handleChange}
                placeholder="Seu email"
              />
              <Input
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
                colorbg="#000000"
                colorfnt="#FFFFFF"
                value="Logar"
                height="6vh"
                width="31vw"
              />
            <Error error={error}/>
            <p>
              Crie sua conta.{" "}
              <a onClick={() => navigate("/Register")}>Registrar-se</a>
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

export default Login;
