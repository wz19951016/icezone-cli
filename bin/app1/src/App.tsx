import React, { useEffect } from "react";
import { app1InitAction } from "./actions"
import Provider from "./provider";
import connect from "./connect";

const historySelf = createHistory();


const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    console.log(props);
    dispatch(app1InitAction())
  }, [0]);

  return (
  <div>app1</div>
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
