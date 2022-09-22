import React from "react";
import * as S from "./style";
import logo from "../../images/logo.svg";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function Header(props) {
  let { navigate } = useContext(Context);
  return (
    <S.header>
      <S.logo src={logo} onClick={props.onClick} />
      {props.children}
    </S.header>
  );
}

export default Header;
