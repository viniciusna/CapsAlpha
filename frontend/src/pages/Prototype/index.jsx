import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import HalfPage from "../../components/HalfPage/HalfPage"
import DocInput from "../../components/DocInput/DocInput.jsx";
import { useParams } from "react-router-dom";

function Prototype() {
  const { id } = useParams()
  let { navigate } = useContext(Context);
  return <>
  <div className="prototype-title">
    {id}
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
