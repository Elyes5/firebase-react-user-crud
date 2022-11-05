import React, { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { db } from './firebase-config';
import Modal from 'react-bootstrap/Modal';
import {ThemeContext} from './ThemeContext';
import Form from 'react-bootstrap/Form';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { addDoc,collection } from "firebase/firestore"
export function ModalExample({addUserRealTime}) {
  const {theme}= useContext(ThemeContext);
  const usersCollectionRef = collection(db,"users")
  const [show, setShow] = useState(false);
  const [userData,setUserData] = useState({
    name : '',
    age : 0,
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const createUser =async () => {
    await addDoc(usersCollectionRef,userData);
    addUserRealTime(userData);
    setShow(false);
    setUserData({
      name :'',
      age: 0,
    })


  }
  return (
    <>
      <Button variant="primary" className="mt-3 ms-5" onClick={handleShow}>
      <FontAwesomeIcon icon={faUser}/> Create User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={theme ? "text-dark bg-light" : "text-light elem-dark-blue-lighter"}>
          <Modal.Title><FontAwesomeIcon icon={faUser} /> Create a user</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme ? 'text-dark elem-light' : 'elem-dark-blue text-light'}>
        <Form.Label column sm="2">
          First Name
        </Form.Label>
        <form>
        <Form.Control size="sm" type="text"  className={theme ? 'bg-light text-dark' : 'text-light elem-dark-blue-lighter'} placeholder="Type in your first name" value={userData.name} onInput={ e => {setUserData({...userData,name : e.target.value});}}/>
        <Form.Label column sm="2">
          Age
        </Form.Label>
        <Form.Control size="sm" type="number"  className={theme ? 'bg-light text-dark' : 'text-light elem-dark-blue-lighter'} placeholder="Type in your age" value={parseInt(userData.age)} onInput={ e => {setUserData({...userData,age  : parseInt(e.target.value)})}}/>
        </form>
        </Modal.Body>
        <Modal.Footer className={theme ? 'text-dark elem-light' : 'elem-dark-blue-lighter text-light'}>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  }
export default ModalExample;
