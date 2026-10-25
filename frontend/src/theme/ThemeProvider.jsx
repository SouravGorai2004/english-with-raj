import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ewr-theme';
const ThemeContext = createContext(null);

function readInitialTheme() {
    const attr = document.documentElement.getAttribute('data-theme');
    return attr === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(readInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const setTheme = useCallback((next) => {
        setThemeState(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* storage unavailable: theme still applies for this visit */
        }
    }, []);

    const toggleTheme = useCallback(
        () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        [theme, setTheme]
    );

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}