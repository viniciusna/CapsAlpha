import Styled from "styled-components";

export const HalfPage = Styled.div`
display: flex;
flex-direction: column;
justify-content: ${(props) => props.justifyContent};
gap: ${(props) => props.gap};
align-items: center;
height:${(props) => props.height};
width:50%;
// border:1px solid green;
overflow-y: hidden;
padding:${(props) => props.padding};
`;
