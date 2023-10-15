import SearchButton from "./searchbutton"
import SearchInput from "./searchInput"
import { KeyboardEvent } from "react";

export default function SearchBox(props: {errorClass:boolean, setInputValue:React.Dispatch<React.SetStateAction<string>>, inputValue:string, getDataFromApi:() => void, handlerEvent: (e:KeyboardEvent) => void}){
    return(
        <div className={props.errorClass ? "active-error" : ""} id="search-box">
            <SearchInput setInputValue={props.setInputValue} inputValue={props.inputValue} handlerEvent={(e:KeyboardEvent) => props.handlerEvent(e)}/>
            <SearchButton getDataFromApi={() => props.getDataFromApi()} errorClass={props.errorClass} inputValue={props.inputValue} />
        </div>
    )
}