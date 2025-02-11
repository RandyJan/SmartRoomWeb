// src/Modal.js
import React from 'react';
import './Modal.scss'; // Import your CSS file
import {faClose} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='btn_close' onClick={onClose}><FontAwesomeIcon icon ={faClose} size='2x' /></div>
                <h2>Room 1</h2>
                <div className='modalBody'>
                <div className='column'>
                    <p>Temperature:</p>
                    <p>Humidity:</p>
                    <p>Gas/Smoke:</p>
                    <p>Motion:</p>

                </div>
                <div className='value'>
                    <p>29°</p>
                    <p>30%</p>
                    <p>detected!</p>
                    <p>There's movement</p>
                </div>
                </div>
                <p>System:</p>
                <div className='output'>
                    <p> it's advisable to leave the premise immediately to avoid harmful outcome</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
