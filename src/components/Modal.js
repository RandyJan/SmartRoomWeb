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
                    <p> {data.temp <= 15?"* Extended exposure to cold can result in hypothermia, characterized by shivering, confusion, and fatigue. Seek warmth immediately."
                    :data.temp >=24?"* Prolonged exposure to extreme heat can cause heat stroke, a life-threatening condition. Symptoms include high body temperature, confusion, and loss of consciousness. leave the premises immediately.":""}</p>
                    <p>{data.hum <= 30?"* Low humidity may exacerbate respiratory problems, causing discomfort for individuals with asthma or allergies.":data.hum > 60?
                    "* Excess moisture can promote the growth of mold and mildew, which can lead to health issues and damage to property.":""}</p>
                    <p>{data.gas >0?"* Potential gas leakage or fire in this room. Immediate response needed.":""}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
