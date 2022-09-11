import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";


function InputHome(props) {
  let { navigate } = useContext(Context);
  return (
    <S.div height={props.height} width={props.width}>
        {props.children}
      <S.input placeholder={props.placeholder}/>
    </S.div>
  );
}

export default InputHome;
