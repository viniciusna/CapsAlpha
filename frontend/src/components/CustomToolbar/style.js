import Styled from 'styled-components';

export const Toolbar = Styled.div`
    margin:0;
    display: flex;
    width: 100%;
    height: 6vh;
    background-color: rgba(0,0,0,.75);

    span{
        color: #b9b9b9;
    }
`;
export const Elements = Styled.div`
    width: 50%;
    display: flex;
    justify-content: space-around;
    @media (max-width: 500px) {
        &{
            overflowY: hidden;
            overflowX: scroll;
        }
        &::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar
        {
            height:5px;
            width: 1px;
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar-thumb
        {
            background-color: rgba(0,0,0,0.5);
            border: 0px solid #555555;
        }
    }
`;
