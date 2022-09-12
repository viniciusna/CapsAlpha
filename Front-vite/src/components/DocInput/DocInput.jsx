import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function DocInput(props) {
  let {} = useContext(Context);
  return (
    <S.Input>
    </S.Input>
  );
}

export default DocInput;
