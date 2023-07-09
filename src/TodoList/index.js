import React from "react";
import './TodoList.css';


function TodoList (props) {
    // De esta forma podemos usar una render prop o una prop children y renderizar una u otra.
    const renderFunc = props.children || props.render;

    return (
        <section className="TodoList-conitainer">
            {props.error && props.onError()}
            {props.loading && props.onLoading()}

            {(!props.loading && !props.totalTodos) && props.onEmptyTodos()}

            {(!!props.totalTodos && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchText)}

            {/* {props.searchedTodos.map(props.render?? props.children)} */}
            {(!props.loading && !props.error) && props.searchedTodos.map(renderFunc)}

            <ul>
                {props.children}
            </ul>
        </section>
    )
};

export {TodoList};