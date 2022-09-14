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

function Editor() {
  let { navigate, user, setUser, users, setUsers, addUser, usersColors } =
    useContext(Context);

  const [quill, setQuill] = useState();

  const logo = "/src/images/logo.svg";

  /*  useEffect(() => {
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      document.getElementById("textPreview").innerHTML = marked.parse(
        document.getElementById("textBox").innerText
      );
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]); */

  // start quill
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        toolbar: false,
        syntax: false,
      },
      formats: [],
      theme: "bubble",
    });
    //q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return (
    <>
      <Header onClick={() => navigate("/Home")}>
        <HeadersButtons gap="2rem">
          <HeadersButtons gap="0.2rem">
            {users.map((user, i) => (
              <UserIdentifier
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
            id="texBox"
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
