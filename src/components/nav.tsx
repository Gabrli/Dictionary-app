import { useState } from 'react'
import '../styles/nav.css'
import { BiSolidBookAlt } from 'react-icons/bi'
import { AiOutlineFontColors } from 'react-icons/ai'
import { MdLightMode } from 'react-icons/md'
export default function Nav(){
    const [ font, setFont ] = useState('')

   

   
    return (
        <>
        <nav>
            <p>{<BiSolidBookAlt/>}</p>
            <section id='selects-wrapper'>
            <label htmlFor='font'>{<AiOutlineFontColors/>}</label>
            <select id='font' name='font' >
                <option><strong>Standart</strong></option>
                <option><strong>Mono</strong></option>
            </select>
            <label htmlFor='mode'>{<MdLightMode/>}</label>
            <select id='mode' name='mode'>
                <option>Light</option>
                <option>Dark</option>
                
            </select>
           
            </section>
           

        </nav>
        </>
    )
}