import Styled from 'styled-components';

export const Input = Styled.input`
    all:unset;
    font-family:Roboto;
    font-size:2em;
    font-weight:400;
    width: 60%;
    overflow:visible;
    text-align:center;
    &:focus {
        border-bottom: 1px solid black
    }
`;
