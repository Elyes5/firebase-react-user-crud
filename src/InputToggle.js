import './InputToggle.css'
import React,{ useContext } from 'react'
import { ThemeContext } from './ThemeContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun,faMoon } from "@fortawesome/free-solid-svg-icons";
export default function InputToggle(){
    const {theme,toggleTheme} = useContext(ThemeContext)
    return(
    <div className="d-flex align-items-center">
       
        <h6 className={theme ? 'me-2 text-dark mt-2' : 'me-2 text-light mt-2'} > <FontAwesomeIcon icon={theme ? faSun : faMoon } /> {theme ? 'Light' : 'Dark'} Mode </h6>
        <label className="switch me-5" >
            <input type="checkbox" onClick={()=>toggleTheme()}></input>
            <span className="slider round"></span>
        </label>
    </div>
    )
}
