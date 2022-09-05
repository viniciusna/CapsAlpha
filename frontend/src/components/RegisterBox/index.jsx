import React from "react";
import { Context } from "../../context/Context.jsx";
import { RegisterForms, RegisterBtnsDiv, RegisterInput, RegisterBtn } from "./style"

function RegisterBox(props) {
    return(
        <section>
            <RegisterForms>
                <RegisterInput></RegisterInput>
                <RegisterInput></RegisterInput>
                <RegisterInput></RegisterInput>
                <RegisterInput></RegisterInput>
            </RegisterForms>  
            <RegisterBtnsDiv>
                <RegisterBtn></RegisterBtn>
                <RegisterBtn></RegisterBtn>
            </RegisterBtnsDiv>      

        </section>

    );
}

export {RegisterBox};