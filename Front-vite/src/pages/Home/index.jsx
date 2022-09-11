import { Context } from "../../context/Context.jsx";
import { IconContext } from "react-icons";
import { useContext } from "react";
import Header from "../../components/Header/Header.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import Button from "../../components/Button/Button.jsx";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import Note from "../../images/notes.svg";
import Doc from "../../images/document.svg";
import { CgProfile } from "react-icons/cg";
import { FaKeyboard } from "react-icons/fa";
import Input from "../../components/InputHome/InputHome"


function Home() {
  let { navigate } = useContext(Context);
  return (
    <>
      <Header onClick={() => navigate("/")}>
        <HeadersButtons>
          <Button
            onClick={() => navigate("/Login")}
            colorbg="#FFFFFF"
            colorfnt="#000000"
            value="Entrar"
            height="5vh"
            width="9vw"
          />
          <Button
            onClick={() => navigate("/Register")}
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
        <HalfPage gap="3em" height="84vh">
          <h1 className="h1-home">Documentos Simultâneos</h1>
          <h3 className="h3-home">Faça aqui seu Mardown</h3>
          <div className="div">
            <Button
              onClick={() => navigate("/Prototype")}
              colorbg="#000000"
              colorfnt="#FFFFFF"
              value="Novo Documento"
              height="6vh"
              width="18vw"
            >
              <img src={Doc} alt="" height={35} />
            </Button>
            <Input height="6vh" width="18vw" placeholder="Digite um código">
              <FaKeyboard />
            </Input>
          </div>
          <div className="hometrace">
            Não tem uma conta?
            <a onClick={() => navigate("/Register")}> Comece agora</a>
          </div>
        </HalfPage>
        <HalfPage gap="0.5em" height="84vh">
          <img src={Note} alt="" srcset="" />
          <div className="text">
            <h2 className="h2-home">Criar um link para compartilhar</h2>
            <p className="p-home">
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
