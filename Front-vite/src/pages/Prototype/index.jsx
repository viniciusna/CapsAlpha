import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import HalfPage from "../../components/HalfPage/HalfPage"
import DocInput from "../../components/DocInput/DocInput.jsx";

function Prototype() {
  let { navigate } = useContext(Context);
  return <>
  <div className="prototype-title">
    <h1>Teste Markdown</h1>
  </div>
  <div className="divv">
  <HalfPage gap="0em" height="80vh" >
    <DocInput />
  </HalfPage>
  <HalfPage gap="0em" height="80vh">

  </HalfPage>
  </div>
  </>;
}

export default Prototype;
