import Styled from "styled-components";

export const div = Styled.p`
    padding: 10px;
    z-index: 5;
    position: absolute;
    margin-top: -10px;
    margin-left: -5vw;
    width: 120px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-itens: center;
    justify-content: center;
    border-radius: 5px;
    border: solid 2px black;
    background-color: white;
`;

export const name = Styled.p`
    text-align: center;
    width: 90%;
    border-bottom: solid 2px black;
`;

export const img = Styled.div`
    z-index: 3;
    cursor: pointer;
`;
