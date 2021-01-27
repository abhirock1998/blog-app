import React, { useReducer, useContext, createContext } from "react";

 const DatalayerProvider = createContext();

export const DataLayer = ({ children, reducer, initialState }) => {
  return (
    <DatalayerProvider.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DatalayerProvider.Provider>
  );
};

export const useDataLayerValue = () => useContext(DatalayerProvider);
