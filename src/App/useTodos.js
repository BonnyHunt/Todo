import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {

  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  //Vamos a crear un nuevo estado para nuestro modal
  const [openModal, setOpenModal] = React.useState(false);


  //Todos completados y totales para TodoCounter.

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;


  //Filtrado por medio de filter e includes para TodoSearch.

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  };

  //Metodos para Actualizar estados de completados y eliminados.

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  //Para añadir todos

  const addTodo = (text) => {
    if (!text.trim()) {
      alert("El nombre está vacío, escribe algo");
      return;
    };
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };


  const state = {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
  };

  const stateUpDaters = {
    setSearchValue,
    completeTodo,
    deleteTodo,
    addTodo, 
    setOpenModal,
    sincronizeTodos,
  };


  return { state, stateUpDaters };

};

export { useTodos };