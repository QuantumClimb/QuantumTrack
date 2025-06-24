import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isAutomatic: boolean;
  setIsAutomatic: (isAutomatic: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    return 'light';
  });

  const [isAutomatic, setIsAutomatic] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAutomaticTheme');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('isAutomaticTheme', JSON.stringify(isAutomatic));

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isAutomatic]);

  useEffect(() => {
    if (!isAutomatic) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 19 || hour < 7; // 7 PM to 7 AM
      setTheme(shouldBeDark ? 'dark' : 'light');
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [isAutomatic]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isAutomatic, setIsAutomatic }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 