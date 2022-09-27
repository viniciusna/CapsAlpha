import React from 'react';
import * as S from './style';
import logo from '../../assets/images/logo-h.svg';
import { Context } from '../../context/Context.jsx';
import { useContext } from 'react';

function Header(props) {
	let { navigate } = useContext(Context);
	return (
		<S.header>
			<S.logo src={logo} onClick={props.onClick} />
			{props.children}
		</S.header>
	);
}

export default Header;
