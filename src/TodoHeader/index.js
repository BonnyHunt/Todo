import React from "react";

function TodoHeader({ children, loading }) {
    // cuando enviamos mas de un elemento, compronente, etc. la app deja de funcionar
    //y aqui es donde entra Children con C mayuscula para solucionar ese problema.
    
    return (
        <header>
            {
            React.Children
            .toArray(children)
            .map((child) => React.cloneElement(child, { loading }))
            } 
        </header>
    )
};

export { TodoHeader };

//Por cada child vamos a llamar a clone element.
//Crear elemento a partir de otro (elemento, objeto con las props que queramos que tenga)