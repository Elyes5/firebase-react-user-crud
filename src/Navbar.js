import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import "./App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faSignIn,faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import InputToggle from './InputToggle';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const logOut = async () =>{
        await signOut(auth);
        navigate("/signup")
    }
  const { theme } = useContext(ThemeContext);
  const { currentUser,loading } = useContext(AuthContext)
  return (
    <Nav className={theme ? "elem-light" : 'elem-dark-blue'}>
    <div className={currentUser && !loading ? "d-md-flex justify-content-between w-100" : "d-md-flex justify-content-end w-100" }>
      { currentUser && !loading &&
      <Nav.Item>
        
        <Link className={"mt-2 ms-5 d-inline-block text-decoration-none " + (theme ? "text-dark fw-bold" : "text-light fw-bold")} to="/home">Users</Link>
      </Nav.Item>
    }
      <div className="d-flex">
        <InputToggle />
        <Nav.Item>
            {
            location.pathname==="/home" ?
            <Link onClick={() => logOut()} className={" d-inline-block h-100 text-center p-2 text-decoration-none " + (theme ? "bg-dark text-white": "text-white elem-dark-blue-lighter")}><FontAwesomeIcon icon={faSignOut} /> Sign Out</Link>
            : location.pathname === "/signup" ?
            <Link className={" d-inline-block h-100 text-center p-2 text-decoration-none " + (theme ? "bg-dark text-white": "text-white elem-dark-blue-lighter")} to="/signin"><FontAwesomeIcon icon={faSignIn} /> Sign In</Link>
            :
            <Link className={" d-inline-block h-100 text-center p-2 text-decoration-none " + (theme ? "bg-dark text-white": "text-white elem-dark-blue-lighter")} to="/signup"><FontAwesomeIcon icon={faUser} /> Sign Up</Link>
            }
        </Nav.Item>
      </div>
    </div>
    </Nav>
  );
}

export default Navbar;