import Styled from "styled-components";

export const div = Styled.div`
    width: 70%;
    height: 7em;
    margin: 2%;
    border: solid 1px #ccc;
    border-radius: 0.5rem;
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
