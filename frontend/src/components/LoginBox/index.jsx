import React from "react";
import { Context } from "../../context/Context.jsx";
import { LoginForms, LoginBtnsDiv, LoginInput, LoginBtn } from "./style"

function LoginBox(props) {
    return (
        <section>
            <LoginForms>
                <LoginInput></LoginInput>
                <LoginInput></LoginInput>
            </LoginForms>
            <LoginBtnsDiv>
                <LoginBtn></LoginBtn>
                <LoginBtn></LoginBtn>
                <LoginBtn></LoginBtn>
            </LoginBtnsDiv>
        </section>
    );
}

export { LoginBox };