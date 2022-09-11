import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import HalfPage from "../../components/HalfPage/HalfPage"
import DocInput from "../../components/DocInput/DocInput.jsx";
import Header from "../../components/Header/Header.jsx";
import UserIdentifier from "../../components/UserIdentifier/UserIdentifier.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";
import { CgProfile } from "react-icons/cg";
import Button from "../../components/Button/Button.jsx";


function Prototype() {
  let { navigate,user, setUser, users, setUsers, addUser, usersColors, logo } = useContext(Context);
  return (
    <>
      <Header>
        <img src={logo} onClick={() => navigate("/")} height="65vh" />
        <HeadersButtons gap="2rem">
          <HeadersButtons gap="0.2rem">
            {users.map((user, i) => (
              <UserIdentifier
                colorbg={usersColors[i][0]}
                colorfnt={usersColors[i][1]}
              >
                {user.toString().charAt(0)}
              </UserIdentifier>
            ))}
          </HeadersButtons>
          <Button
            onClick={() => navigate("/Login")}
            colorbg="#FFFFFF"
            colorfnt="#000000"
            value="Entrar"
            height="5vh"
            width="9vw"
          />
          <Button
            onClick={() => navigate("/Register")}
            colorbg="#000000"
            colorfnt="#FFFFFF"
            value="Criar conta"
            height="5vh"
            width="9vw"
          />
          <CgProfile size={38} />
        </HeadersButtons>
      </Header>
      <div className="divv">
        <HalfPage gap="0em" height="92vh">
          <DocInput />
        </HalfPage>
        <HalfPage gap="0em" height="92vh">
          <h1>Welcome to Markdown</h1>
        </HalfPage>
      </div>
    </>
  );
}

export default Prototype;
