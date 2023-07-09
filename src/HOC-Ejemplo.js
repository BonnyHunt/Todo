import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

function App(props) {
    return (
        <h1> ¡{props.saludo}, {props.nombre}!</h1>
    );
};

function withSaludo(WrappedComponent) {
    return function wrappedComponentWithSaludo(saludo) {
        return function ComponenteDeVerdad(props) {
            return (
                <React.Fragment>
                    <WrappedComponent {...props} saludo={saludo} />
                    <h2>Estamos acompañando al WrappedComponent</h2>
                </React.Fragment>
            );
        };
    }
};

const AppWithWhatever = withSaludo(App)("QLQ");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppWithWhatever nombre="Joc" />
    //<App saludo="Buenas" nombre="Juanito" />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/* Ejemplo HOC usado en para escuchar el Storage... Luego cambiado a un Custom Hook */
/* El archivo se llamaba withStorageListener */

function withStorageListener(WrappedComponent) {
    return function WrappedComponentWithStorageListener(props) {
        const [storageChange, setStorageChange] = React.useState(false);

        window.addEventListener('storage', (change) => {
            if(change.key === 'TODOS_V1') {
                console.log('Hubo cambios en TODOS_V1');
                setStorageChange(true);
            }
        });

        const toggleShow = () => {
            props.sincronize();
            setStorageChange(false);
        };

        return (
        <WrappedComponent
        show={storageChange} 
        toggleShow={toggleShow} 
        />
       );
    };

};

export { withStorageListener };