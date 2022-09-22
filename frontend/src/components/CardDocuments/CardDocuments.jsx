import React from "react";
import * as S from "./style";
import dateFormat from "../../utils/dateFormat";

function CardDocuments({title, updatedAt, owner, handleClick}) {
  return (
      <S.div onClick={handleClick}>
        <S.updateAt>
          {dateFormat(updatedAt)}
        </S.updateAt>
 
        <S.title>
          {title}
        </S.title>
                 
        <S.owner>
          {owner}
        </S.owner>
          
      </S.div>
    );
}

export default CardDocuments
