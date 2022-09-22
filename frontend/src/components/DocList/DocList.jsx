import React from "react";
import * as S from "./style";
import { Context } from "../../context/Context.jsx";
import { useContext } from "react";

function DocList(props) {
  let { navigate } = useContext(Context);
  return (
    <S.DocList className="halfpage" id={props.id} ref={props.abacate} gap={props.gap} height={props.height} justify>
      {props.children}
    </S.DocList>
  );
}

export default DocList;
