import Styled from "styled-components";

export const user = Styled.div`
height:4vh;
width:3vw;
border: 0.1rem solid black;
background-color: ${(props) => props.colorbg};
color: ${(props) => props.colorfnt};
border-radius: 50%;
cursor: pointer;
display:flex;
justify-content: center;
align-items: center;
gap: 1.5rem;
font-size:1.5rem;
font-weight:bold;
`;
