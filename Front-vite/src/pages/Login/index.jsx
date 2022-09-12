import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import InputBox from "../../components/InputBox/InputBox.jsx";
import Input from "../../components/Input/Input";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import logo from "../../images/LogoVertical.svg";
import Button from "../../components/Button/Button.jsx";

const inputHeight = "6vh";
const inputWidth = "30vw";

function Login() {
  let { navigate } = useContext(Context);
  return (
    <>
      <div className="divv">
        <HalfPage gap="0em" height="100vh">
          <InputBox title="Fazer Login" height="65vh">
            <Input
              label="Email"
              height={inputHeight}
              width={inputWidth}
              placeholder="Seu email"
            />
            <Input
              label="Senha"
              height={inputHeight}
              width={inputWidth}
              placeholder="Digite uma senha"
            />

            <Button
              onClick={() => navigate("/Editor")}
              colorbg="#000000"
              colorfnt="#FFFFFF"
              value="Logar"
              height="6vh"
              width="31vw"
            />
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
