import { Context } from "../../context/Context.jsx";
import { IconContext } from "react-icons";
import { useContext } from "react";
import Header from "../../components/Header/Header.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import Button from "../../components/Button/Button.jsx";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import Notes from "../../images/notes.svg";
import Doc from "../../images/document.svg";
import { CgProfile } from "react-icons/cg";
import Input from "../../components/Input/Input"



function Home() {
  let { navigate } = useContext(Context);
  return (
    <>
      <Header onClick={() => navigate("/")}>
        <HeadersButtons>
          <Button
            colorbg="#FFFFFF"
            colorfnt="#000000"
            value="Entrar"
            height="5vh"
            width="9vw"
          />
          <Button
            colorbg="#000000"
            colorfnt="#FFFFFF"
            value="Criar conta"
            height="5vh"
            width="9vw"
          />
          <CgProfile size={38} />
        </HeadersButtons>
      </Header>
      <div className="divv">
        <HalfPage gap="3em">
          <h1>Documentos Simultâneos</h1>
          <h3>Faça aqui seu Mardown</h3>
          <div className="div">
            <Button
              colorbg="#000000"
              colorfnt="#FFFFFF"
              value="Novo Documento"
              height="6vh"
              width="18vw"
            >
              <img src={Doc} alt="" height={35} />
            </Button>
            <Input height="6vh" width="18vw" placeholder="Digite um código" />
          </div>
          <div className="hometrace">
            Não tem uma conta?{" "}
            <a href={() => navigate("/Register")}> Comece agora</a>
          </div>
        </HalfPage>
        <HalfPage gap="0.5em">
          <img src={Notes} alt="" srcset="" />
          <div className="text">
            <h2>Criar um link para compartilhar</h2>
            <p>
              Clique em Novo documento se quiser criar um link para enviar aos
              convidados
            </p>
          </div>
        </HalfPage>
      </div>
    </>
  );
}

export default Home;
