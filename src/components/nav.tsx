import { useState, useEffect } from 'react'
import '../styles/nav.css'
import { BiSolidBookAlt } from 'react-icons/bi'
import { AiOutlineFontColors } from 'react-icons/ai'
import { MdLightMode } from 'react-icons/md'
export default function Nav(){
    const [ mode, setMode ] = useState('')

    useEffect(() => {
        console.log(mode)
    }, [mode])
    return (
        <>
        <nav>
            <p>{<BiSolidBookAlt/>}</p>
            <section id='selects-wrapper'>
            <label htmlFor='font'>{<AiOutlineFontColors/>}</label>
            <select id='font' name='font' >
                <option><strong>Serif</strong></option>
                <option><strong>Roboto</strong></option>
                <option><strong>Mono</strong></option>
            </select>
            <label htmlFor='mode'>{<MdLightMode/>}</label>
            <select id='mode' name='mode'>
                <option>Light</option>
                <option>Dark</option>
                <option >Dark-violet mode</option>
            </select>
           
            </section>
           

        </nav>
        </>
    )
}