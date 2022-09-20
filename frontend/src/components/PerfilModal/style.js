import Styled from "styled-components";

export const div = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    position: absolute;
    right: 0.2rem;
    top: 3.2rem;
    width: 7.5vw;
    height: 11vh;
    border-radius: 0.5rem;
    // border:1px solid red;
    background-color: unset;
    box-shadow: 3px 3px 15px 3px rgba(0,0,0,0.2);
`;

export const name = Styled.p`
    text-align: center;
    width: 100%;
    border-bottom: solid 2px black;

`;

export const img = Styled.div`
    z-index: 3;
    cursor: pointer;
`;
