import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import { RegisterBox } from "../../components/RegisterBox/index.jsx"

function Register() {
  let { navigate } = useContext(Context);
  return <>
  <RegisterBox></RegisterBox>
  </>;
}

export default Register;
