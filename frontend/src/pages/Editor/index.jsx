import { Context } from "../../context/Context.jsx";
import HalfPage from "../../components/HalfPage/HalfPage";
import Header from "../../components/Header/Header.jsx";
import UserIdentifier from "../../components/UserIdentifier/UserIdentifier.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import { CgProfile } from "react-icons/cg";
import Button from "../../components/Button/Button.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { marked } from "marked";
import { useParams } from "react-router-dom";
import { modules } from './customToolbar'
import { CustomToolbar } from "./customToolbar";
function Editor() {
  const { navigate, user, setUser, users, setUsers, addUser, usersColors } =
    useContext(Context);
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState();
  const [connect, setConnect] = useState(false)
  const { documentId } = useParams()
  const logo = "/src/images/logo.svg";

  // Inicia o socket
  useEffect(() => {
    const s = new WebSocket("ws://localhost:3001")
    setSocket(s)

    s.onopen = () =>{
      setConnect(true)
      s.send(JSON.stringify(
        {
          type: "join",
          params: {
            userId: user.id,
            documentId: documentId
          }
        }
        )
      );
    }

    // return () => {
    //   s.close()
    // }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
      document.getElementById("textPreview").innerHTML = marked.parse(
        document.getElementById("textBox").innerText
      );

    }

    socket.onmessage =  (event) =>  {
      console.log('Recebeu')
      console.log(event.data)
      const data = JSON.parse(event.data)
      console.log(event)
      if(data.type == 'message') handler(data.params.data)
    };

    return () => {
      socket.close()
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      document.getElementById("textPreview").innerHTML = marked.parse(
        document.getElementById("textBox").innerText
      );
      socket.send(JSON.stringify({type: "message",params: { data: delta, room: documentId }}))
    }

    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)

    const q = new Quill(editor, {
      modules: modules,
      formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color"
      ],  
      theme: 'snow',
    });
    // q.disable()
    // q.setText("Loading...")
    setQuill(q)
  }, [])

  return (
    <>
      <Header onClick={() => navigate("/Home")}>
        <HeadersButtons gap="2rem">
          <HeadersButtons gap="0.2rem">
            {users.map((user, i) => (
              <UserIdentifier
                key={i}
                colorbg={usersColors[i][0]}
                colorfnt={usersColors[i][1]}
              >
                {user.toString().charAt(0)}
              </UserIdentifier>
            ))}
          </HeadersButtons>
          <CgProfile size={38} />
        </HeadersButtons>
      </Header>
      <div className="divv">
        <HalfPage gap="0em" height="92vh">
          <CustomToolbar />
          <div
            id="textBox"
            ref={wrapperRef}
            style={{ height: "100%", width: "100%" }}
          ></div>
        </HalfPage>
        <HalfPage gap="0em" height="92vh">
          <div id="textPreview">{}</div>
        </HalfPage>
      </div>
    </>
  );
}

export default Editor;
