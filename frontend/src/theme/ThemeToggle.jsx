import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider.jsx';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={isDark}
        >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
    );
}