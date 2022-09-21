import Styled from "styled-components";

export const DocList = Styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
gap: ${(props) => props.gap};
align-items: center;
height:${(props) => props.height};
width:50%;
border:1px solid green;
overflow-y: scroll;
padding:${(props) => props.padding};
`;
