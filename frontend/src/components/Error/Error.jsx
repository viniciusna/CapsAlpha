import React from "react";
import * as S from "./style";


function Error({error}) {
  if(error){
    return (
      <S.p>
          {error}
      </S.p>
    );
  }else{
    return (
      <S.p>
      </S.p>
    );
  }
}

export default Error
