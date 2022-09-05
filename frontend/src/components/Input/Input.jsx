import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import {FaKeyboard} from "react-icons/fa"

function Button(props) {
  let { navigate } = useContext(Context);
  return (
    <S.div height={props.height} width={props.width}>
      <FaKeyboard />
      <S.input placeholder={props.placeholder}/>
    </S.div>
  );
}

export default Button;
