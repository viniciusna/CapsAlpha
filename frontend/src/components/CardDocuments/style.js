import Styled from "styled-components";

export const div = Styled.div`
    width: 38vw;
    height: 10vh;
    border: solid 1px #ccc;
    border-radius: 10px;
    background-color: white;
    box-shadow: 5px 5px 5px #aaa;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 2%;
    transition: 0.6s;
    &:hover {
        background-color: #eee;  
        cursor: pointer;   
      }
`;

export const title = Styled.div`
    text-align: center;
    flex-grow: 4;
    color: #000;
`;

export const updateAt = Styled.div`
    color: #888;
`;

export const owner = Styled.div`
    color: #000;
`;
