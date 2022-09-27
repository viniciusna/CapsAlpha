import Styled from 'styled-components';

export const div = Styled.div`
    padding: 10px;
    z-index: 10;
    position: absolute;
    margin-top: -10px;
    margin-left: -5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1.5rem;
    top: 50px;
    width: 6rem;
    height: 7rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 3px 3px 15px 3px rgba(0,0,0,0.2);
`;

export const name = Styled.p`
    text-align: center;
    width: 100%;
    border-bottom: solid 2px black;
`;

export const img = Styled.div`
    z-index: 3;
    cursor: pointer;
`;
