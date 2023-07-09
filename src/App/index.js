import React from "react";
import { useTodos } from "./useTodos";
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch'
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../modal';
import { ChangeAlert } from '../ChangeAlert';

function App() {

  const { state, stateUpDaters } = useTodos();

  const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
  } = state;

  const {
    setSearchValue,
    completeTodo,
    deleteTodo,
    addTodo, 
    setOpenModal,
    sincronizeTodos,
  } = stateUpDaters;

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />

        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchText={searchValue}
        onError={() => <p>Hijo e su puta madre llamen a Dios...</p>}
        onLoading={() => <p>Estamos cargando awuanta...</p>}
        onEmptyTodos={() => <p>Crea tu primer TODO</p>}
        onEmptySearchResults={(searchText) => <p>No hay resultados para {searchText} </p>}
        render={todo => (
          <TodoItem
            Key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      ></TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <CreateTodoButton
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <ChangeAlert
        sincronize={sincronizeTodos} />

    </React.Fragment>
  );
};

export default App;
