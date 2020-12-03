import React, { useEffect, useState, createContext } from "react";

export const Store = createContext(null);
const Provider = (props) => {
  const { store, children } = props;
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe((value) => {
      setState(value);
    });
  }, []);
  return <Store.Provider value={{ state, store }}>{children}</Store.Provider>;
};
console.log(Store);
export default Provider;
