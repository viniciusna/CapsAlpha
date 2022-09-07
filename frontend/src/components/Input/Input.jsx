import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function Input(props) {
  let { navigate } = useContext(Context);
  return (
        <S.div>
            <label>{props.label}</label>
            <S.input placeholder={props.placeholder} height={props.height} width={props.width}/>
        </S.div>
  );
}

export default Input;
