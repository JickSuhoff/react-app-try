// PopupContext.js

import React, { createContext, useContext, useState } from 'react';
import Popup from './Popup';

const PopupContext = createContext();

export function PopupProvider({ children }) {
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            setPopupMessage('');
        }, 3000); 
    };

    return (
        <PopupContext.Provider value={{ openPopup }}>
            {children}
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </PopupContext.Provider>
    );
}

export function usePopup() {
    return useContext(PopupContext);
}
