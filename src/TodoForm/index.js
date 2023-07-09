import React from "react";
import './TodoForm.css';

function TodoForm({ addTodo, setOpenModal }) {
// Creamos un estado para nuestro nuevo TODO
    const [ newTodoValue, setNewTodoValue ] = React.useState('');

// Creamos una función para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };

// Función para cerrar el modal
    const onCancel = () => {
        setOpenModal(false);
    };

// Función para agregar nuestro nuevo TODO
    const onSubmit= (event) => {

        event.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
        setNewTodoValue('')

    };

    return(
        <form onSubmit={onSubmit}>
            <label>Añade tus nuevos TODOs</label>
            <textarea
            value={newTodoValue}
            onChange={onChange}
            placeholder="Cortar la ceboola" 
            />
            <div className="TodoForm-buttonContainer">
                <button
                type="button" 
                className="TodoForm-button TodoForm-button--cancel"
                onClick={onCancel}
                >
                    Cancelar
                </button>

                <button
                type="submit"
                className="TodoForm-button TodoForm-button--add"
                >
                    Añadir
                </button>
            </div>
        </form>
    );
};

export { TodoForm };