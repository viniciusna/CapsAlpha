import { BsFillFileEarmarkTextFill } from 'react-icons/bs'
import Button from '../../components/Button/Button'
import { useState } from 'react'
import * as S from './style'
export default function ButtonNewDocument({handleClick}){
    const [hover, setHover] = useState(false)
    return (
        <S.Search >
            <BsFillFileEarmarkTextFill color={hover ? 'black' : 'white'} style={{marginLeft: "1rem", position: "absolute"}} size={'1.5em'} />
            <Button
                onClick={handleClick}
                colorbg="black"
                colorfnt="white"
                sizefnt='.9rem'
                value="Novo Documento"
                height="3rem"
                width="15rem"
                onMouseOver={()=> setHover(true)}
                onMouseOut={()=> setHover(false)}
            >
            </Button>        
        </S.Search>
  )
}