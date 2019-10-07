import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import { Trans as T } from "@lingui/react";

const App = ({ message }) => {
  return (
    <div>
      <span>{message} </span>
      <span>
        <T>and @lingui/react is working</T>
      </span>
    </div>
  );
};
App.propTypes = {
  message: PropTypes.string.isRequired
};

export default hot(App);
