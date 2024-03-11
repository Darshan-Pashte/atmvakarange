import React, { createContext, useReducer } from 'react';
import { initialState } from './store/LoaderStore';
import { LoaderReducer } from './reducer/LoaderReducer';

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoaderReducer, initialState);
  return <LoaderContext.Provider value={{ state, dispatch }}>{children}</LoaderContext.Provider>;
};
