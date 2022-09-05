import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import Header from "../../components/Header/Header.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import InputWithIcon from "../../components/InputWithIcon/InputWithIcon.jsx";

function Home() {
  let { navigate } = useContext(Context);
  return (
    <>
      <Header onClick={() => navigate("/")}>
        <HeadersButtons>
          <AiFillQuestionCircle size={38} />
          <AiFillMessage size={38} />
          <IoIosSettings size={38} />
          <CgProfile size={38} />
        </HeadersButtons>
      </Header>
      <InputWithIcon />
    </>
  );
}

export default Home;