import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import Header from "../../components/Header/Header.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Home() {
  let { navigate } = useContext(Context);
  return (
    <Header onClick={() => navigate("/")}>
      <HeadersButtons>
        <AiFillQuestionCircle />
        <AiFillMessage />
        <CgProfile />
      </HeadersButtons>
    </Header>
  );
}

export default Home;