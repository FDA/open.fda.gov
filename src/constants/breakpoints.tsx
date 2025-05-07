import { useState, useEffect } from 'react';

const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({
    mob: true,
    tab: false,
    desk: false,
    wide: false,
  });

  const updateBreakpoints = () => {
    setBreakpoints({
      mob: window.matchMedia('(max-width: 640px)').matches,
      tab: window.matchMedia('(min-width: 641px) and (max-width: 1023px)').matches,
      desk: window.matchMedia('(min-width: 1024px) and (max-width: 1399px)').matches,
      wide: window.matchMedia('(min-width: 1400px)').matches,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateBreakpoints();
      window.addEventListener('resize', updateBreakpoints);

      return () => {
        window.removeEventListener('resize', updateBreakpoints);
      };
    }
  }, []);

  return breakpoints;
};

export default useBreakpoints;