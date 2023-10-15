import { KeyboardEvent } from "react";
export default function SearchInput(props: {setInputValue:React.Dispatch<React.SetStateAction<string>>, inputValue:string, handlerEvent: (e:KeyboardEvent) => void}){
    return (
        <input
            value={props.inputValue}
            onChange={(e) => {
              props.setInputValue(e.target.value);
            }}
            onKeyDown={(e) => props.handlerEvent(e)}
            id="search"
            name="search"
            type="text"
            placeholder="Enter the keyword"
          />
    )
}