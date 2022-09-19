import React, { useReducer, useState } from "react";
import { CgProfile } from "react-icons/cg";
import * as S from './style'
import { useContext } from "react";
import { Context } from "../../context/Context";
import ButtonModal from "../Button/ButtonModal";
import { useNavigate } from "react-router-dom";
const HoverableDiv = ({ handleMouseOver, handleMouseOut }) => {
  return (
    <S.img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <CgProfile size={38} />
     </S.img>
  );
};

const HoverText = ({name, handleMouseOver,handleMouseOut}) => {
    const { user, setUser, documents, setDocuments} = useContext(Context);
    const navigate = useNavigate();
  
    function handleClickExit(){
        setUser('')
        setDocuments('')
        navigate("/home")
    }
  return (
    <S.div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <S.name>
            {name}
        </S.name>
        <ButtonModal
            onClick={()=> navigate("/profile")}
            colorbg="white"
            colorfnt="black"
            value="Perfil"
            height="2rem"
            width="4rem"
        />
        <ButtonModal
            onClick={handleClickExit}
            colorbg="white"
            colorfnt="black"
            value="Sair"
            height="2rem"
            width="4rem"
        />
    </S.div>
  );
};

function PerfilModal(){
  const { user, setUser, documents, setDocuments} = useContext(Context);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      {/* Hover over this div to hide/show <HoverText /> */}
      <HoverableDiv
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
      />
    { isHovering && <HoverText handleMouseOut={handleMouseOut} handleMouseOver={handleMouseOver} name={user.name}/> }
    </div>
  );
};
export default PerfilModal