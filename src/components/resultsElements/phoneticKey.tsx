
export default function PhoneticKey(props: {phoneticKey:string}){
    return(
        <p id="how-read-text">
        <strong>{props.phoneticKey}</strong>
       </p>
    )
}