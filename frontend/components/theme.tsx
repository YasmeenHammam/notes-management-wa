import {  createContext, useState } from 'react';
import { ChildrenType }  from './types';

export const ThemeContext = createContext('light');

export default function ThemeToggle({ children }: ChildrenType) {
    const [theme, setTheme] = useState('light');
    return (
        <ThemeContext.Provider value={theme}>
            <div className='changeTheme'>
                <button
                    name='change_theme'
                    onClick={() => {
                        setTheme(prevTheme => prevTheme == 'light' ? 'dark' : 'light')
                }}
                >chnage theme</button>
            </div>
            {children}
        </ThemeContext.Provider>
    )
}


