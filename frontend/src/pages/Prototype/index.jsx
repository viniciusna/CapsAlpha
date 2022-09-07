import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import HalfPage from "../../components/HalfPage/HalfPage"

function Prototype() {
  let { navigate } = useContext(Context);
  return <>
  <HalfPage gap="0em" height="80vh" >

  </HalfPage>
  <HalfPage gap="0em" height="80vh">

  </HalfPage>
  </>;
}

export default Prototype;
