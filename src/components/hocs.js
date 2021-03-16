import React, { useEffect, useState } from 'react';

import store from '../services/redux/store';


/** An HOC function for Components with skeletons
 * @param {(class|function)} WrappedComponent
 * @param {string} isLoadingAddr
 * @param {object} props
 * @return {node}
 */
export function withSkeleton(WrappedComponent, isLoadingAddr) {
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
      <strong>SKELETON</strong>;
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
