import Header from "../../components/Header/Header.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import Button from "../../components/Button/Button.jsx";
import HalfPage from "../../components/HalfPage/HalfPage.jsx";
import Note from "../../images/notes.svg";
import Doc from "../../images/document.svg";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import Input from "../../components/InputHome/InputHome";
import CardDocuments from "../../components/CardDocuments/CardDocuments.jsx";
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useDebugValue } from "react";
import * as S from './style'
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import PerfilModal from '../../components/PerfilModal/index'
import InputDocumentCode from "./InputDocumentCode.jsx";
import ButtonNewDocument from "./ButtonNewDocument.jsx";

function Home() {
  const [value, setValue] = useState('')
  const [hover, setHover] = useState(false)
  const [registerHover, setRegisterHover] = useState(false)
  const [documentLoaded, setDocumentLoaded] = useState(false)
  const { user, setUser, documents, setDocuments } = useContext(Context);
  const navigate = useNavigate()

  function handleChange(event) {
    const value = event.target.value;
    setValue(value);
  }

  useEffect(() => {
    if (!user || documentLoaded) return

    fetch('http://localhost:3001/document/my', {
      method: 'GET',
      credentials: 'include',

      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message !== 'Success') {
          setError(res.message)
          return null
        }
        setDocuments(res.data.documents)
      })
      .catch(err => console.log(err));
    setDocumentLoaded(true)
  }, [user])
  function handleClickLinkDocument() {
    navigate(`/Editor/${value}`)
  }

  function handleClickCreateDocument(event) {
    fetch("http://localhost:3001/document/", {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message !== "Success") {
          setError(res.message);
          return null;
        }
        navigate('/Editor/' + res.data.documentId)
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header onClick={() => navigate("/")}>
        <HeadersButtons gap="2em">
          {
            user
              ?
              <PerfilModal />
              :
              <>
                <Button
                  onClick={() => navigate("/Login")} 
                  onMouseOver={() => setHover(true)}
					        onMouseOut={() => setHover(false)}
                  colorbg={hover ? "black" : 'white'}
                  colorfnt={hover ? "white" : 'black'}
                  value="Entrar"
                  height="5vh"
                  width="9vw"
                />
                <Button
                  onClick={() => navigate("/Register")}
                  onMouseOver={() => setRegisterHover(true)}
					        onMouseOut={() => setRegisterHover(false)}
                  colorbg={registerHover ? "white" : 'black'}
                  colorfnt={registerHover ? "black" : 'white'}
                  value="Criar conta"
                  height="5vh"
                  width="9vw"
                />
              </>
          }
        </HeadersButtons>
      </Header>
      <div className="divv">
        <HalfPage gap="3em" height="84vh">
          <h1 className="h1-home">Documentos Simultâneos</h1>
          <h3 className="h3-home">Faça aqui seu Mardown</h3>
          <S.button>
            <div>
              <ButtonNewDocument handleClick={handleClickCreateDocument} />
              <InputDocumentCode handleChange={handleChange} />
            </div>
            {value ? (
              <S.search onClick={handleClickLinkDocument}>
                Join
              </S.search>
            ) : (
              ""
            )}
          </S.button>
          <S.div className="hometrace">
            Não tem uma conta?
            <a onClick={() => navigate("/Register")}>
               Comece agora
            </a>
          </S.div>
        </HalfPage>

        <HalfPage gap="0.5em" height="84vh" padding="50%">
          {documents ? (
            documents.map((document, index) => {
              if (index > 15) return
              return (
                <CardDocuments
                  title={document.title}
                  key={document.id}
                  updatedAt={document.updated_at}
                  owner={document.owner}
                  handleClick={() => navigate(`/Editor/${document.id}`)}
                />
              );
            })
          ) : (
            <>
              <img src={Note} alt="" srcSet="" />
              <div className="text">
                <h2 className="h2-home">Criar um link para compartilhar</h2>
                <p className="p-home">
                  Clique em Novo documento se quiser criar um link para enviar aos
                  convidados
                </p>
              </div>
            </>
          )}

        </HalfPage>
      </div>
    </>
  );
}
export default Home;
