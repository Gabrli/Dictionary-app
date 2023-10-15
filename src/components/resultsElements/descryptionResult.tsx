import Meanings from "./meanings"
import Synoms from "./synoms"

export default function DescryptionResult(props: {meanings:string, synoms:string}){
    return(
        <div id="descryption-results-wrapper">
            <span>Meaning</span>
             <Meanings meanings={props.meanings}/>
            <section id="synoms-box">
            <p>
              <strong>Synonyms</strong>
            </p>
            <Synoms synoms={props.synoms}/>
            </section>
        </div>
    )
}