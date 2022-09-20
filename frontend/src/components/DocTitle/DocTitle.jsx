import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function DocTitle(props) {
  let {} = useContext(Context);
  return (
    <S.Input id={props.id} value={props.value} onInput={props.onInput} onBlur={props.onBlur}/>
  );
}

export default DocTitle;
