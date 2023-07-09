import React from "react";
import './CreateTodoButton.css'

function CreateTodoButton ({ openModal, setOpenModal }) {

    const onClickButton = () => {
        setOpenModal(!openModal);
    };

    return (
        <button 
        className="CreateTodoButton"
        onClick={() => onClickButton('Aqui se deberia abrir el modal')}
        >
            +
        </button>
    )
};

export {CreateTodoButton};