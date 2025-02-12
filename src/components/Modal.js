// src/Modal.js
import React from 'react';
import './Modal.scss'; // Import your CSS file
import {faClose} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ isOpen, onClose,data }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='btn_close' onClick={onClose}><FontAwesomeIcon icon ={faClose} size='2x' /></div>
                <h2>Room {data.room}</h2>
                <div className='modalBody'>
                <div className='column'>
                    <p>Temperature:</p>
                    <p>Humidity:</p>
                    <p>Gas/Smoke:</p>
                    <p>Motion:</p>

                </div>
                <div className='value'>
                    <p>{data.temp}°</p>
                    <p>{data.hum}%</p>
                    <p>{data.gas == 1?'Detected!':'None'}</p>
                    <p>{data.motion == 1?'Theres movement':'No movement'}</p>
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
