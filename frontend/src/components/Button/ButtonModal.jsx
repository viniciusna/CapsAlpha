import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function ButtonModal(props) {
  let { navigate } = useContext(Context);
  return (
    <S.buttonModal
      onClick={props.onClick}
      colorbg={props.colorbg}
      colorfnt={props.colorfnt}
      height={props.height}
      width={props.width}
      onMouseOut={props.onMouseOut}
      onMouseOver={props.onMouseOver}
    >
      {props.children}
      {props.value}
    </S.buttonModal>
  );
}

export default ButtonModal;
