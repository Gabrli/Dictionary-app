
import '../styles/nav.css'

import { BiSolidBookAlt } from 'react-icons/bi'
import { BsCodeSlash } from 'react-icons/bs'
import { MdLightMode } from 'react-icons/md'
export default function Nav(props: {switchTheme:  () => void}){
    

   

   
    return (
        <>
        <nav>
            <p>{<BiSolidBookAlt/>}</p>
            <section id='selects-wrapper'>
            
           <p><a target='_blank' href='https://github.com/Gabrli/Dictionary-app'>Repo <span>{<BsCodeSlash/>}</span></a></p>
           
            <button id='mode' name='mode' onClick={props.switchTheme}>{<MdLightMode/>}</button>
           
            </section>
           

        </nav>
        </>
    )
}