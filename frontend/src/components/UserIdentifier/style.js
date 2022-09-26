import Styled from 'styled-components';

export const user = Styled.div`
  height: 2rem;
  width: 2rem;
  background-color: ${(props) => props.colorbg};
  color: ${(props) => props.colorfnt};
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight:bold;
  gap: 1rem;

  &:hover{
    filter: brightness(70%);
  }
`;
