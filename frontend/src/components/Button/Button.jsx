import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function Button(props) {
  let { navigate } = useContext(Context);
  return (
    <S.button
      onClick={props.onClick}
      colorbg={props.colorbg}
      colorfnt={props.colorfnt}
      height={props.height}
      width={props.width}
      sizefnt={props.sizefnt}
      onMouseOut={props.onMouseOut}
      onMouseOver={props.onMouseOver}
    >
      {props.children}
      {props.value}
    </S.button>
  );
}

export default Button;
