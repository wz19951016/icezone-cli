import React, { useEffect } from "react";
import { maInitAction } from "./actions"
import Provider from "./provider";
import connect from "./connect";

const historySelf = createHistory();


const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    console.log(props);
    dispatch(maInitAction())
  }, [0]);

  return (
  <div>ma</div>
  );
};
const BaseApp = connect((state) => {
  return { ...state };
})(App);

const WrapApp = ({ globalEventDistributor, history }) => {
  console.log(globalEventDistributor);
  return (
    <Provider store={globalEventDistributor}>
      <BaseApp history={history} />
    </Provider>
  );
};

export default WrapApp;
