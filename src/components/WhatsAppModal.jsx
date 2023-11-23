import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaWhatsapp  } from 'react-icons/fa';

const WhatsAppModal = ({ closeWhatsAppModal }) => {

    return (
        <>
            <div className='modal'>
                <div className="modal-content">
                    <div className="modal-close-wrapper">
                        <IoMdClose className='modal-close' size={30} color='red' onClick={closeWhatsAppModal}/>
                    </div>
                    <p className='open-whatsapp'>For security purposes, we encourage you to use WhatsApp to communicate with our team regarding credit withdrawals and additions. Click the 'Open WhatsApp' button below to initiate a chat with our support team.</p>
                    <div className="modal-button whatsapp-btn"><FaWhatsapp className='whatsapp-icon' size={28}/>Open WhatsApp</div>
                </div>
            </div>
        </>
    )
}

export default WhatsAppModal