import React from 'react';
import * as S from './style';
import { Context } from '../../context/Context.jsx';
import { useContext } from 'react';

function Input(props) {
	let { navigate } = useContext(Context);
	return (
		<S.div>
			<label>{props.label}</label>
			<S.input
				onKeyPress={props.onKeyPress}
				className={props.className}
				name={props.name}
				value={props.value}
				type={props.type}
				onChange={props.handleChange}
				placeholder={props.placeholder}
				height={props.height}
				width={props.width}
			/>
			{props.error && <S.error>{props.error}</S.error>}
		</S.div>
	);
}

export default Input;
