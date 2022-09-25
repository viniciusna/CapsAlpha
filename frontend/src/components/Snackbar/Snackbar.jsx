import React from 'react';
import * as S from './style';
import { Context } from '../../context/Context.jsx';
import { useContext } from 'react';

function Snackbar(props) {
	let { navigate } = useContext(Context);
	return (
		<S.div>
			{props.children}
		</S.div>
	);
}

export default Snackbar;