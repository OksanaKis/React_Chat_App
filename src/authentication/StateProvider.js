import React, { createContext, useContext } from "react";
import useLocalStorage from "../authentication/useLocalStorage";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useLocalStorage(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
