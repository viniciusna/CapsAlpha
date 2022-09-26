import React from 'react';
import * as S from './style';
import { Context } from '../../context/Context.jsx';
import { useContext } from 'react';

function HalfPage(props) {
	let { navigate } = useContext(Context);
	return (
		<S.HalfPage
			className="halfpage"
			id={props.id}
			ref={props.abacate}
			gap={props.gap}
			height={props.height}
			justifyContent={props.justifyContent}
			paddingTop={props.paddingTop}
		>
			{props.children}
		</S.HalfPage>
	);
}

export default HalfPage;
