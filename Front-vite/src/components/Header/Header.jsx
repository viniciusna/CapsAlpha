import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function Header(props) {
  let { navigate } = useContext(Context);
  return (
    <S.header>
      {props.children}
    </S.header>
  );
}

export default Header;
