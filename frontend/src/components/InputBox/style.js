import Styled from "styled-components";

export const div = Styled.div`
    height: ${(props) => props.height};
    width:70%;
    // border:1px solid black;
    border-radius:5px;
    padding:1em;
    box-shadow: 3px 3px 15px 3px rgba(0,0,0,0.2); `;

 export const headers = Styled.div`
    height:20%;
    border-radius:5px;
    padding:1em;
    display:flex;
    flex-direction:column;
    gap:1em;

 `;
 
 export const inputs = Styled.div`
    // border:1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    height: 100%;
 `;
