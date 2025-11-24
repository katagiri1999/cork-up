import { useEffect } from 'react';

import '../assets/loading.css';


function Loading(props) {
  var isLoading = props.loading;

  useEffect(() => {
    const loadingElement = document.getElementById('LOADING');

    if (isLoading) {
      loadingElement.style.display = 'initial';
      loadingElement.style.opacity = '1';
    } else {
      loadingElement.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <div id="LOADING">
      <div id="LOADING-ANIMATION">
        <div id="LOADING-ANIMATION-CIRCLE"></div>
      </div>
    </div>
  );
};

export default Loading;