import './InputToggle.css'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext';
export default function InputToggle(){
    const {theme,toggleTheme} = useContext(ThemeContext)
    return(
    <div className="d-flex">
        <h6 className={theme ? 'me-2 text-dark' : 'me-2 text-light'}>{theme ? 'Light' : 'Dark'} Mode </h6>
        <label className="switch me-5" >
            <input type="checkbox" onClick={()=>toggleTheme()}></input>
            <span className="slider round"></span>
        </label>
    </div>
    )
}
