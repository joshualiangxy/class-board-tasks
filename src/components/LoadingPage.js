import React from 'react';

const LoadingPage = () => (
  <div className="loader">
    <img className="loader__image" src="/images/loader.svg" alt="Loading..." />
    <p className="loader__text">
      This loading gif is provided by{' '}
      <a href="https://loading.io/">loading.io</a>
    </p>
  </div>
);

export default LoadingPage;
