import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function UserIdentifier(props) {
  let { navigate } = useContext(Context);
  return (
    <S.user colorbg={props.colorbg} colorfnt={props.colorfnt}>
      {props.children}
    </S.user>
  );
}

export default UserIdentifier;
