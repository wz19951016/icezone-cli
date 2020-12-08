import React, { useEffect, useState, createContext } from "react";

export const Store = createContext(null);
const Provider = (props) => {
  const { store, children } = props;
  const [state, setState] = useState(store.getState());
  const [isSubScribe, setIsSubScribe] = useState(false);
  useEffect(() => {
    store.subscribe((value) => {
      setState(value);
    });
    setIsSubScribe(true)
  }, []);
  return <Store.Provider value={({ state, store })}>{isSubScribe && children}</Store.Provider>;
};
console.log(Store);
export default Provider;
