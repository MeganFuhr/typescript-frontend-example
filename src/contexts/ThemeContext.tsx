import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define color palettes for each mode
const lightPalette = {
  primary: { main: '#3B82F6' },
  secondary: { main: '#8B5CF6' },
  background: { default: '#FFFFFF', paper: '#FFFFFF' },
  text: { primary: '#1F2937' },
  success: { main: '#10B981' },
  error: { main: '#EF4444' },
};

const darkPalette = {
  primary: { main: '#6C9EFF' },
  secondary: { main: '#A78BFA' },
  background: { default: '#1A202C', paper: '#2D3748' },
  text: { primary: '#F0F0F0' },
  success: { main: '#6EE7B7' },
  error: { main: '#F87171' },
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Get initial theme from localStorage or default to 'light'
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode === 'light' || savedMode === 'dark') ? savedMode : 'light';
  });

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Memoize toggleTheme to prevent recreation on every render
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  // Memoize theme creation - only recreate when mode changes
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
  }), [mode]);

  // Memoize context value - only recreate when dependencies change
  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
