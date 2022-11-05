import React,{useState,useContext} from 'react'
import {ThemeContext} from './ThemeContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from "./firebase-config";
import Spinner from 'react-bootstrap/Spinner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';
export default function LogIn(){
    let navigate = useNavigate();
    let { currentUser,loading }  = useContext(AuthContext)
    const [user,setUser] = useState({
        email :'',
        password :'',  
    })
    useEffect(() => {
        if (currentUser){
            navigate('/home')
        }
      }, [loading]);
    const loginUser = async(email,password) => {
        try{
            const user = await signInWithEmailAndPassword(auth,email,password);
            console.log(user);
            setUser({email : '',password: ''})
            navigate("/home");
        }catch(error){
            console.log(error.message);
        }
    }
    
    const {theme} = useContext(ThemeContext);
    return(
        <div className={"d-flex flex-column justify-content-center align-items-center min-h-100-vh w-100 " + (theme ? 'bg-white' : 'bg-dark-blue') } >
            { !loading && !currentUser ? 
            (<div className={"border border-secondary p-5 rounded " + (theme ? " bg-gray" : "elem-dark-blue text-white")}>
            <h3 className="text-center">Sign In</h3>
            <div>
            <Form>
                <div className="flex-column justify-content-center align-items-center d-flex">
                <div>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <br></br>
                    <Form.Control className={theme ? "bg-white" :  "elem-dark-blue-lighter"} placeholder="Email" name="email" type="email" id="email" required value={user.email} onInput={(event) => setUser({...user,email : event.target.value})}></Form.Control>
                </div>
                <div>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <br></br>
                    <Form.Control className={theme ? "bg-white" :  "elem-dark-blue-lighter"} placeholder="Password" name="password" type="password" id="password" required value={user.password} onInput={(event) => setUser({...user,password : event.target.value})}></Form.Control>
                </div>
                <br></br>
                <div>
                <Button className="w-100" variant="primary" onClick={() => loginUser(user.email,user.password)}>Sign In</Button>
                </div>
                </div>
            </Form> 
            </div>
            </div>)
    :  
     
    (<div>

    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>)
}
        </div>
    )
    
}