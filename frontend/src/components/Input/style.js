import Styled from 'styled-components';

export const input = Styled.input`
    all:unset;
    border:1px solid #000000;
    border-radius:0.5rem;
    height:${(props) => props.height};
    width:${(props) => props.width};
    padding-left:0.5rem;

`;
export const div = Styled.div`
    display:flex;
    gap:0.5rem;
    flex-direction:column;
`;

export const error = Styled.label`
  font-size: 1rem;
  color: #FF5959;
`;
