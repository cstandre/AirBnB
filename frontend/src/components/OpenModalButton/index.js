import React from "react";
import { useModal } from "../../context/Modal";

import './OpenModalButton.css';

export default function OpenModalButton ({ modalComponent, buttonText, onButtonClick, onModalClose}) {
    const {setModalContent, setOnModalClose} = useModal();

    const onClick = () => {
        if (typeof onButtonClick === 'function') onButtonClick();
        if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }

    // if (buttonText === 'Sign Up') {
    //     return (<button className="sign-up-btn" onClick={onClick}>{buttonText}</button>)
    // }
    return (
        <button className="modal-button" onClick={onClick}>{buttonText}</button>
    );
};
