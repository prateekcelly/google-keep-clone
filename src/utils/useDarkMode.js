const { useState, useEffect } = require('react');

const useDarkMode = () => {
  const [themeState, setThemeState] = useState({
    dark: false,
    hasThemeLoaded: false,
  });

  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true';
    setThemeState({
      ...themeState,
      dark: isDark,
      hasThemeLoaded: true,
    }); // eslint-disable-next-line
  }, []);

  return [themeState, setThemeState];
};

export default useDarkMode;
