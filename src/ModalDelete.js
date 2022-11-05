import React, { useState,useContext } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from './firebase-config';
import { faTimes,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ThemeContext} from './ThemeContext';
import { doc,deleteDoc } from 'firebase/firestore';
function ModalDelete({id,getUsers}) {
  const [show, setShow] = useState(false);
  const {theme}= useContext(ThemeContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteUser = async(id) =>{
    const userDoc = doc(db,"users",id)
    await deleteDoc(userDoc);
    getUsers();
    setShow(false);
  }

  return (
    <>
      <FontAwesomeIcon icon={faTimes} onClick={() => handleShow()} className={'cursor-pointer ' + (theme ? 'me-2 text-dark' : 'me-2 text-light')}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className={theme ? "text-dark bg-light" : "text-light elem-dark-blue-lighter"}  closeButton>
          <Modal.Title className={theme ? 'text-dark' : 'text-light'}><FontAwesomeIcon icon={faTrash} /> Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme ? 'text-dark elem-light' : 'elem-dark-blue text-light'} >Are you sure about deleting this user?</Modal.Body>
        <Modal.Footer className={theme ? 'text-dark elem-light' : 'elem-dark-blue-lighter text-light'}>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteUser(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDelete;