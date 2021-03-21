import React, { useEffect, useState } from 'react';

import store from '../services/redux/store';
import Text from './Text';


/** An HOC function for Components with skeletons
 * @param {(class|function)} WrappedComponent
 * @param {(class|function)} WrappedComponentSkeleton
 * @param {string} isLoadingAddr
 * @param {object} props
 * @return {node}
 */
export function withSkeleton(
    WrappedComponent, WrappedComponentSkeleton, isLoadingAddr,
) {
  return function WithSkeletonComponent(props) {
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
      store.subscribe(() => {
        // eslint-disable-next-line no-unused-vars
        const currentState = store.getState();

        setIsLoading(
            eval(`currentState.${isLoadingAddr}`),
        );
      });
    }, []);

    return isLoading === false ?
      <WrappedComponent {...props} /> :
      <WrappedComponentSkeleton />;
  };
}


/** An HOC function for Components with skeletons
 * @param {(class|function)} WrappedComponent
 * @param {string} isLoadingAddr
 * @param {object} props
 * @return {node}
 */
export function withUrl(WrappedComponent, isLoadingAddr) {
  return function WithUrlComponent(props) {
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
      store.subscribe(() => {
        // eslint-disable-next-line no-unused-vars
        const currentState = store.getState();

        setIsLoading(
            eval(`currentState.${isLoadingAddr}`),
        );
      });
    }, []);

    return isLoading === false ?
      <WrappedComponent {...props} /> :
      <strong>SKELETON</strong>;
  };
}


/** An HOC function for Components with skeletons
 * @param {(class|function)} WrappedComponent
 * @param {(class|function)} WrappedComponentSkeleton
 * @param {boolean} didErrorOccur
 * @param {boolean} isLoading
 * @param {function} retryFunction
 * @param {object} props
 * @return {node}
 */
export function withErrorBoundary(
    WrappedComponent, WrappedComponentSkeleton, didErrorOccur, isLoading,
    retryFunction,
) {
  return function WithErrorBoundaryComponent(props) {
    if (isLoading) {
      return <WrappedComponentSkeleton />;
    } else if (didErrorOccur) {
      return <div className="error-boundary-container">
        <Text>Something went wrong</Text>
        <button onClick={retryFunction}>RETRY</button>
      </div>;
    }

    return <WrappedComponent {...props} />;
  };
}
