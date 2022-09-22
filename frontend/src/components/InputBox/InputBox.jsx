import React from 'react';
import * as S from './style';
import { Context } from '../../context/Context.jsx';

function InputBox(props) {
	return (
		<S.div height={props.height}>
			<S.headers>
				<h3>Bem-Vindo!</h3>
				<h2>{props.title}</h2>
			</S.headers>
			<S.inputs>{props.children}</S.inputs>
		</S.div>
	);
}

export default InputBox;
