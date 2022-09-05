import React from "react";
import { Context } from "../../context/Context.jsx";

function RegisterBox(props) {
    return(
        <section>
            <div className="registerForms">
                <input className="registerInput" type="text" placeholder="username"></input>
                <input className="registerInput" type="text" placeholder="e-mail"></input>
                <input className="registerInput" type="text" placeholder="password"></input>
                <input className="registerInput" type="text" placeholder="confirm password"></input>
            </div>
            <div className="registerButton">
            <button></button>
            <button></button>
            </div>

        </section>

    );
}

export {RegisterBox};