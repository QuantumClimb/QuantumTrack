import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    // Default to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [isAutomatic, setIsAutomatic] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAutomaticTheme');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('isAutomaticTheme', JSON.stringify(isAutomatic));

    // Update document class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isAutomatic]);

  useEffect(() => {
    if (!isAutomatic) return;

    // Function to check time and set theme
    const checkTime = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 19 || hour < 7; // 7 PM to 7 AM
      setTheme(shouldBeDark ? 'dark' : 'light');
    };

    // Check immediately
    checkTime();

    // Check every minute
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [isAutomatic]);

  return {
    theme,
    setTheme,
    isAutomatic,
    setIsAutomatic,
  };
} 