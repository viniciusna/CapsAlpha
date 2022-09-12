import Styled from "styled-components";

export const button = Styled.div`
    display: flex;
    justify-content: start;
    width: 75%;
    gap:1rem;
    &>div{
        display: flex;
        gap: 1rem;
    }
`;

export const search = Styled.p`
    color: #666;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover{
        color: #000;    
    }
`;
