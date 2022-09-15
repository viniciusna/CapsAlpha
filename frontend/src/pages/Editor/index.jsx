import { Context } from "../../context/Context.jsx";
import HalfPage from "../../components/HalfPage/HalfPage";
import Header from "../../components/Header/Header.jsx";
import UserIdentifier from "../../components/UserIdentifier/UserIdentifier.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import { CgProfile } from "react-icons/cg";
import Button from "../../components/Button/Button.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import { marked } from "marked";
import { useParams } from "react-router-dom";

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
    const ws = new WebSocket("ws://localhost:3001");
     
    setSocket(ws)
    document.getElementById('textBox').innerHTML = "";
    const editor = document.createElement("div");
    document.getElementById('textBox').append(editor);
    const q = new Quill(editor, {
      modules: {
        toolbar: false,
        syntax: false,
      },
      formats: [],
      theme: "bubble",
    });
    q.setText("Loading...");
    setQuill(q);
    ws.onopen = () =>{
        setConnect(true)
        ws.send(JSON.stringify(
          {
            type: "join",
            params: {
              userId: 199,
              documentId: documentId
            }
          }
          )
        );            
      }
      const handler = (delta, oldDelta, source) => {   
        if(!ws) return 
        if (source !== "user") return
        document.getElementById("textPreview").innerHTML = marked.parse(
          document.getElementById("textBox").innerText
        );
        ws.send(JSON.stringify(
          {
            type: "message",
            params: {
              data: delta
            }
          }
          )
        );  
      }
      
    q.on("text-change", handler)     
    return () => {
       ws.close()
    }
  }, [])

 
  // useEffect(() => {
  //   if (socket == null || connect == true) return  
  //   socket.addEventListener("open", () =>{
  //     socket.send(JSON.stringify(
  //        {
  //          type: "join",
  //          params: {
  //            userId: user.id,
  //            documentId: documentId
  //          }
  //        }
  //        )
  //      );  
  //    })    
  
  // }, [socket])

  // Emite as mudanças
  useEffect(() => {
    if (socket == null || quill == null) return
    
    // const handler = (delta, oldDelta, source) => {   
    //   if (source !== "user") return
    //   document.getElementById("textPreview").innerHTML = marked.parse(
    //     document.getElementById("textBox").innerText
    //   );
    //   socket.send(JSON.stringify(
    //     {
    //       type: "message",
    //       params: {
    //         data: delta
    //       }
    //     }
    //     )
    //   );  
    // }
    // quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  // Recebe as mudanças
  useEffect(() => {
    if (quill == null || socket == null) return
    
    const handler = delta => {
      console.log(delta)
      quill.updateContents(delta)
      console.log(quill.getContents())
    }
    socket.onmessage =  (event) =>  {
      console.log('Recebeu')
      console.log(event.data)
      const data = JSON.parse(event.data)
      console.log(event)
      if(data.type == 'message') handler(data.params.data)
    };

    return () => {
      // socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  // start quill
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    // wrapper.innerHTML = "";
    // const editor = document.createElement("div");
    // wrapper.append(editor);
    // const q = new Quill(editor, {
    //   modules: {
    //     toolbar: false,
    //     syntax: false,
    //   },
    //   formats: [],
    //   theme: "bubble",
    // });
    // //q.disable();
    // q.setText("Loading...");
    // setQuill(q);
  }, []);

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
