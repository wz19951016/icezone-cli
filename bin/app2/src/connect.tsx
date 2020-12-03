import React from "react";
import { Store } from "./provider";

const connect = (mapStateToProps) => {
  return (WrappedComponent) => {
    return (props) => {
      console.log(props);
      return (
        <Store.Consumer>
          {({ state, store }) => {
            return (
              <WrappedComponent
                {...mapStateToProps(state, props)}
                // {...mapDispatchToProps(dispatch, props)}
                dispatch={(args) => {
                  // return () => {
                  store.dispatch.call(store, args);
                  // };
                }}
                {...props}
              />
            );
          }}
        </Store.Consumer>
      );
    };
  };
};
export default connect;
