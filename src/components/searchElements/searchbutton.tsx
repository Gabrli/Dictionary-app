import { AiOutlineSearch } from "react-icons/ai";

export default function SearchButton(props:{getDataFromApi: () => void, errorClass:boolean, inputValue:string}){
    return(
        <span
            onClick={() => props.getDataFromApi()}
            className={props.errorClass ? "active-error-text" : "normal-text"}
        >{<AiOutlineSearch/>}</span>
    )
}