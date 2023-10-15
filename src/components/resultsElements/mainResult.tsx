import KeyWord from "./keyword"
import PhoneticKey from "./phoneticKey"
import ButtonPlayAudio from "../buttonPlayAudio"

export default function MainResult(props: {titleResult:string, phoneticKey:string, playAudio: () => void, audio:string}){
    return (
        <div id="main-result-box">
            <section className="main-result-section" id="first">
                <KeyWord titleResult={props.titleResult}/>
                <PhoneticKey phoneticKey={props.phoneticKey}/>
            </section>
            <section className="main-result-section" id="btn-box">
                <ButtonPlayAudio audioValue={props.audio} playAudio={props.playAudio}/>
            </section>
        </div>
    )
}