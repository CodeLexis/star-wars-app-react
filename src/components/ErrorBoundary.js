import React from 'react';

import PropTypes from 'prop-types';
import Text from './Text';


/** Renders a component useful for catching errors.*/
export default class ErrorBoundary extends React.Component {
  /** Class constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /** Update state so the next render will show the fallback UI.
   * @param {Object} error
   * @return {Object}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /** Handles an error from the children
   * @param {Object} error
   * @param {Object} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  /** Renders error boundary component
   * @return {node}
   */
  render() {
    const { children, retryFunction } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="error-boundary-container">
        <Text>{process.env.REACT_APP_DEFAULT_API_ERROR_MESSAGE}</Text>
        <button onClick={retryFunction}>RETRY</button>
      </div>;
    }

    return children ? children : <div className="error-boundary-container">
      <Text>{process.env.REACT_APP_DEFAULT_API_ERROR_MESSAGE}</Text>
      <button onClick={retryFunction}>RETRY</button>
    </div>;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  retryFunction: PropTypes.func,
};
