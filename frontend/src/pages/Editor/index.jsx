import { Context } from "../../context/Context.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";

function Editor() {
const wrapperRef = useCallback((wrapper) => {
  if (wrapper == null) return;

  wrapper.innerHTML = "";
  const editor = document.createElement("div");
  wrapper.append(editor);
  new Quill(editor, {
    modules: {
      toolbar: false,
      syntax: false,
    },
    formats: [],
    theme: "bubble",
  });
}, []);

  let { navigate } = useContext(Context);
  return (
    <>
      <div className="container">
        <h1>Editor</h1>
        <div className="editor">
          <div id="editor" className="text-editor" ref={wrapperRef}></div>
          <div className="text-preview"></div>
        </div>
      </div>
    </>
  );
}

export default Editor;
