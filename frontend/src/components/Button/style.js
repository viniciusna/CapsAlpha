import Styled from "styled-components";

export const button = Styled.div`
height:${(props) => props.height};
width:${(props) => props.width};
border: 0.1rem solid black;
background-color: ${(props) => props.colorbg};
color: ${(props) => props.colorfnt};
border-radius: 0.5rem;
cursor: pointer;
display:flex;
justify-content: center;
align-items: center;
gap: 1.5rem;
`;