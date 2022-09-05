import React from "react";
import { Context } from "../../context/Context.jsx";
import { LoginForms, LoginBtns, LoginInput, LoginBtn } from "./style"

function LoginBox(props) {
    return (
        <section>
            <LoginForms>
                <LoginInput></LoginInput>
                <LoginInput></LoginInput>
            </LoginForms>
            <LoginBtns>
                <LoginBtn></LoginBtn>
                <LoginBtn></LoginBtn>
                <LoginBtn></LoginBtn>
            </LoginBtns>
        </section>
    );
}

export { LoginBox };