import { Context } from "../../context/Context.jsx";
import { useContext, useState } from "react";
import HeaderProfile from "../../components/Header/HeaderProfile.jsx";
import EditBox from "./EditBox.jsx";
import * as S from './style'

function Profile() {

  return (
    <>
    <HeaderProfile />
    <S.body>
        <EditBox />
    </S.body>
    </>
  );
}

export default Profile;
