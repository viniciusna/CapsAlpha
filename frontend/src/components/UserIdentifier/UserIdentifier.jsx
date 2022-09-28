import React from 'react';
import * as S from './style';
import { Context } from '../../context/Context.jsx';
import { useContext } from 'react';
import { Tooltip } from '@mui/material';

function UserIdentifier(props) {
    let { navigate } = useContext(Context);
    return (
        <Tooltip title={props.name}>
            <S.user colorbg={props.colorbg} colorfnt={props.colorfnt}>
                {props.children}
            </S.user>
        </Tooltip>
    );
}

export default UserIdentifier;