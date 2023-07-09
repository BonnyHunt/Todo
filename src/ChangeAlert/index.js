import React from "react";
import { useStorageListener } from "./useStorageListener";
import './changeAlert.css'

function ChangeAlert({ sincronize }) {
    const { show, toggleShow } = useStorageListener(sincronize);

    if (show) {
        return (
            <div
                className="main-changeAlert--container">
                <div className="changeAlert-container">
                    <h2>Hubo cambios mi pana</h2>
                    <p
                        className="changeAlert-container--p">
                        Necesitas recargar la información</p>
                    <button
                        className="ChangeAlert-Btn"
                        /* onClick={() => toggleShow(false)}>
                            Volver a cargar la información */
                        onClick={() => { window.location.reload(); }}>volver a cargar la informacion
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export { ChangeAlert };

/* Para recargar la página en onClick llame únicamente window.location.reload() 
y al recargar la ya no hacía falta toggleShow porque por defecto se volvía a false. */
{/* <button  onClick={() => {window.location.reload();}}></button> */ }