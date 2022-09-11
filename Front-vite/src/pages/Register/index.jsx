import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import InputBox from "../../components/InputBox/InputBox.jsx"
import Input from "../../components/Input/Input";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import logo from "../../images/LogoVertical.svg";
import Button from "../../components/Button/Button.jsx";

const inputHeight = "6vh"
const inputWidth = "30vw"

function Register() {
  let { navigate } = useContext(Context);
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
            />
            <Input
              label="Usuário"
              height={inputHeight}
              width={inputWidth}
              placeholder="Seu nome de usuário"
            />
            <Input
              label="Senha"
              height={inputHeight}
              width={inputWidth}
              placeholder="Digite uma senha"
            />
            <Input
              label="Confirmar Senha"
              height={inputHeight}
              width={inputWidth}
              placeholder="Confirme a sua senha"
            />
            <Button
              onClick={() => navigate("/Editor")}
              colorbg="#000000"
              colorfnt="#FFFFFF"
              value="Cadastrar"
              height="6vh"
              width="31vw"
            />
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
