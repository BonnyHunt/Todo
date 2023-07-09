import React, { useReducer } from "react";

//vamos a crear nuestro custom React Hook

function useLocalStorage(itemName, initialValue) {

  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));
  const {
    sincronizedItem,
    loading,
    error,
    item,
  } = state;


  /* const [sincronizedItem, setSincronizedItem] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [item, setItem] = React.useState(initialValue); */

  // Action Creators
  const onError = (error) => dispatch({ type: actionTypes.error, payload: error });
  const onSucess = (item) => dispatch({ type: actionTypes.succes, payload: item });
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });
  const onSincronize = () => dispatch({ type: actionTypes.save, });

  React.useEffect(() => {
    setTimeout(() => {
      try {

        const LocalStorageItem = localStorage.getItem(itemName);
        let parseItem;

        if (!LocalStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parseItem = initialValue;

        } else {
          parseItem = JSON.parse(LocalStorageItem);
        };

        /* setItem(parseItem);
        setLoading(false);
        setSincronizedItem(true); */
        onSucess(parseItem);
      } catch (error) {
        //dispatch({type: actionTypes.error, payload: error});
        //setError(error);
        onError(error);
      }
    }, 1000);
  }, [sincronizedItem])

  const saveItem = (newItem) => {
    try {

      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem('TODOS_V1', stringifiedItem);
      //setItem(newItem);
      onSave(newItem);

    } catch (error) {
      //dispatch({type: actionTypes.error, payload: error});
      //setError(error);
      onError(error);
    }
  };

  const sincronizeItem = () => {
    /* setLoading(true);
    setSincronizedItem(false); */
    onSincronize();
  };


  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };

};

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  loading: true,
  error: false,
  item: initialValue,
});

const actionTypes = {
  error: 'ERROR',
  succes: 'SUCCES',
  save: 'SAVE',
  sincronize: 'SINCRONIZE',
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true
  },
  [actionTypes.succes]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };