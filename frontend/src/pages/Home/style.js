import Styled from 'styled-components';

export const button = Styled.div`
    display: flex;
    justify-content: start;
    width: 75%;
    gap:1rem;
    &>div{
        display: flex;
        gap: 1rem;
    }; 
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

export const Search = Styled.div`
    padding: .5rem;
    position: relative;
    display: flex;  
    align-items: center;
    width: 18vw;
`;

export const SearchBar = Styled.input`
    border:1px solid #000000;
    border-radius:0.5rem;
    padding: 1rem 1rem 1rem 3.5rem;
    width: 100%;
    font-size: 1rem;
`;

export const div = Styled.div`
    flex-direction: row;    
    column-gap: 5px;

`;

