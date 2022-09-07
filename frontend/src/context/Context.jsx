import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext({});

export const Provider = (props) => {

    const navigate = useNavigate();

    return (
        <Context.Provider
            value={{
                navigate,
            }}
        >
            {props.children}
        </Context.Provider>
    );
}