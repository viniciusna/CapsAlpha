import Styled from 'styled-components';

export const user = Styled.div`
  height: 2rem;
  width: 2rem;
  background-color: ${(props) => props.colorbg};
  color: ${(props) => props.colorfnt};
  border-radius: 100%;
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 0.2rem;
  font-size: 1.5rem;
  font-weight:bold;
`;
