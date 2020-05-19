// External Dependencies
import { useEffect, useRef } from 'react';

// Hook Definition
function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    function cleanUp() {
      isMounted.current = false;
    }

    return cleanUp;
  });
  return isMounted;
}

export default useIsMounted;
