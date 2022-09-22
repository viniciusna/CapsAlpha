import Header from "./Header";
import HeadersButtons from "../HeadersButtons/headerButton";
import PerfilModal from "../PerfilModal";
import Button from "../Button/Button";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function HeaderProfile() {
    const { user, setUser, documents, setDocuments} = useContext(Context);
    const { navigate } = useContext(Context);

    return (
    <Header onClick={() => navigate("/")}>
      <HeadersButtons gap="2em">
        {user ? (
          <PerfilModal />
        ) : (
          <>
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
          </>
        )}
      </HeadersButtons>
    </Header>
  );
}
