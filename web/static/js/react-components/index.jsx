import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";

const App = ({ message }) => {
  return (
    <div>
      <span>{message}</span>
    </div>
  );
};
App.propTypes = {
  message: PropTypes.string.isRequired
};

export default hot(App);
