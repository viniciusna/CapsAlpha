import { Context } from "../../context/Context.jsx";
import { useContext } from "react";
import { LoginBox } from "../../components/LoginBox/index.jsx"

function Login() {
  let { navigate } = useContext(Context);
  return <>
  <LoginBox></LoginBox>
  </>;
}

export default Login;
