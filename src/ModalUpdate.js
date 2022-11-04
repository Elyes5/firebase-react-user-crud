import React, { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { db } from './firebase-config';
import Modal from 'react-bootstrap/Modal';
import {ThemeContext} from './ThemeContext';
import Form from 'react-bootstrap/Form';
import './App.css';
import { updateDoc,doc } from "firebase/firestore"
function ModalUpdate({id,name,age,getUsers}) {
  const {theme}= useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const [userData,setUserData] = useState({
    name : name,
    age : age,
  })
  const updateUser = async (id,user) =>{
    const userDoc = doc(db,"users",id);
    await updateDoc(userDoc,user)
    handleClose();
    getUsers();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span className="cursor-pointer" onClick={handleShow}>
      ✎
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={theme ? "text-dark bg-light" : "text-light elem-dark-blue-lighter"}>
          <Modal.Title>Update the user</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme ? 'text-dark elem-light' : 'elem-dark-blue text-light'}>
        <Form.Label column sm="2">
          First Name
        </Form.Label>
        <form>
        <Form.Control size="sm" type="text" placeholder="Type in your first name" value={userData.name} onInput={ e => {setUserData({...userData,name : e.target.value});}} className={theme ? 'bg-light text-dark' : 'text-light elem-dark-blue-lighter'}/>
        <Form.Label column sm="2">
          Age
        </Form.Label>
        <Form.Control size="sm" type="number" placeholder="Type in your age" value={parseInt(userData.age)} onInput={ e => {setUserData({...userData,age  : parseInt(e.target.value)})}}  className={theme ? 'bg-light text-dark' : 'text-light elem-dark-blue-lighter'}/>
        </form>
        </Modal.Body>
        <Modal.Footer className={theme ? 'text-dark elem-light' : 'elem-dark-blue text-light'}>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => updateUser(id,userData)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  }
export default ModalUpdate;
