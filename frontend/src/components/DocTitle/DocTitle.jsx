import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function DocInput(props) {
  let {} = useContext(Context);
  return (
    <S.Input id={props.id} onInput={props.onInput} value={props.value} onBlur={props.onBlur} onClick={props.onClick}>
    </S.Input>
  );
}

export default DocInput;
