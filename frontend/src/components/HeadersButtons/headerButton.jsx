import React from 'react';
import * as S from "./style";


function headerButton(props) {
  return (
    <S.headerButton gap={props.gap}>
      {props.children}
    </S.headerButton>
  );
}

export default headerButton;