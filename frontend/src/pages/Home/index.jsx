import { Context } from "../../context/Context.jsx";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import Button from "../../components/Button/Button.jsx";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import Note from "../../images/notes.svg";
import Doc from "../../images/document.svg";
import { CgProfile } from "react-icons/cg";
import { FaKeyboard } from "react-icons/fa";
import Input from "../../components/InputHome/InputHome"
import Error from "../../components/Error/Error.jsx";

function Home() {
  const [documentCode, setDocumentCode] = useState("");
  let { navigate } = useContext(Context);
  const [error, setError] = useState("")
  const logo = "/src/images/logo.svg"

  function handleChange (event) {
    const value = event.target.value;
    setDocumentCode(value);
  }
  function handleClickLinkDocument(event){
    fetch(`http://localhost:3001/document/${documentCode}`, {
      method: 'GET',  
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.message !== 'Success') {
          setError(res.message)
          return null
        }
        navigate('/prototype')
      })
      .catch(err => console.log(err)); 
  }
  function handleClickCreateDocument (event) {
    fetch('http://localhost:3001/document/', {
      method: 'POST',  
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.message !== 'Success') {
          setError(res.message)
          return null
        }
        navigate('/prototype')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Header>
        <img src={logo} onClick={() => navigate("/")} height="65vh"/>
        <HeadersButtons gap="2rem">
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
              onClick={handleClickCreateDocument}
              colorbg="#000000"
              colorfnt="#FFFFFF"
              value="Novo Documento"
              height="6vh"
              width="18vw"
            >
              <img src={Doc} alt="" height={35} />
            </Button>
            <Input handleChange={handleChange} height="6vh" width="18vw" placeholder="Digite um código">
              <FaKeyboard />
            </Input>
            {documentCode && <Button
              onClick={handleClickLinkDocument}
              colorbg="#FFF"
              colorfnt="#000"
              value="Participar"
              height="6vh"
              width="5vw"
            ></Button>}
            <Error error={error}/>
          </div>
          <div className="hometrace">
            Não tem uma conta?
            <a onClick={() => navigate("/Register")}> Comece agora</a>
          </div>
        </HalfPage>
        <HalfPage gap="0.5em" height="84vh">
          <img src={Note} alt="" srcSet="" />

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
