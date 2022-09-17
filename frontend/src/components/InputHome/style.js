import Styled from 'styled-components';

export const input = Styled.input`
    all:unset;

`;
export const div = Styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    gap:1rem;
    border:1px solid #000000;
    border-radius:0.5rem;
    height:${(props) => props.height};
    width:${(props) => props.width};


`;
