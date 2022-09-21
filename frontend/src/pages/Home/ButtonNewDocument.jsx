import { BsFillFileEarmarkTextFill } from 'react-icons/bs'
import Button from '../../components/Button/Button'
import { useState } from 'react'
import * as S from './style'
export default function ButtonNewDocument({handleClick}){
    const [hover, setHover] = useState(false)
    return (
			<S.Search>
				<BsFillFileEarmarkTextFill
					color={hover ? 'black' : 'white'}
					style={{ marginLeft: '1rem', position: 'absolute' }}
					size={'1.5em'}
				/>
				<Button
					onClick={handleClick}
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
					colorbg={hover ? '#ffffff' : '#02040A'  }
					colorfnt={hover ? 'black' : 'white'}
					sizefnt=".9rem"
					value="Novo Documento"
					height="3rem"
					width="15rem"
				></Button>
			</S.Search>
		);
}