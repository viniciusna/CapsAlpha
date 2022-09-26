import Styled from "styled-components";

export const headerButton = Styled.div`
    all:unset;
    display: flex;
    align-items: center;
    height:5vh;
    width:fit-content;
    gap:${(props) => props.gap};
    margin-right: 1rem;

`;

