import { FaKeyboard } from "react-icons/fa";
import Input from '../../components/Input/Input'
import * as S from './style'

export default function InputDocumentCode({handleChange}){

    return (
            <S.Search>
                <FaKeyboard style={{marginLeft: "1rem", position: "absolute"}}  size="1.5em" />
                <S.SearchBar
                    onChange={handleChange} 
                    id="search-bar" 
                    type="text"
                    placeholder="Digite um código">
                </S.SearchBar>
              </S.Search>
            )
}