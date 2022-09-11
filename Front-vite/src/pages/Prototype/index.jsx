import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import HalfPage from "../../components/HalfPage/HalfPage"
import DocInput from "../../components/DocInput/DocInput.jsx";
import Header from "../../components/Header/Header.jsx";
import UserIdentifier from "../../components/UserIdentifier/UserIdentifier.jsx";
import HeadersButtons from "../../components/HeadersButtons/headerButton";

function Prototype() {
  let { navigate,user, setUser, users, setUsers, addUser, usersColors } = useContext(Context);
  return (
    <>
      <Header>
        <div></div>
        <HeadersButtons gap="0.5rem">
          {users.map((user,i) => (<UserIdentifier colorbg={usersColors[i][0]} colorfnt={usersColors[i][1]}>{user.toString().charAt(0)}</UserIdentifier>))}
        </HeadersButtons>
      </Header>
      <div className="prototype-title">
        <h1>Teste Markdown</h1>
      </div>
      <div className="divv">
        <HalfPage gap="0em" height="80vh">
          <DocInput />
        </HalfPage>
        <HalfPage gap="0em" height="80vh"></HalfPage>
      </div>
    </>
  );
}

export default Prototype;
