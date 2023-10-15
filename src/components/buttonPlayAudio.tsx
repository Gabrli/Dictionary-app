import { BsFillVolumeUpFill } from "react-icons/bs";

export default function ButtonPlayAudio(props: { playAudio: (audio:string) => void, audioValue:string}){
    return(
        <button onClick={() => props.playAudio(props.audioValue)}>
              {<BsFillVolumeUpFill />}
         </button>
    )
}