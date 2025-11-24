import { useEffect } from 'react';

import '../assets/loading.css';
import screenStore from '../store/screen_store.jsx';


function Loading() {
  const { isLoading } = screenStore();

  useEffect(() => {
    const loading = document.getElementById('LOADING');

    if (isLoading) {
      loading.style.display = 'initial';
      loading.style.opacity = '1';
    } else {
      loading.style.display = 'none';
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