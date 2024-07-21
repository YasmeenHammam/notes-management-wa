export interface PostProps {
    note: Note;
    handleDeleteNote: (note: Note) => void;
    handleEditNote: (note: Note) => void;
    user: loggedUser | null

}

export interface Page {
    notes: Note[];
    setCurrentNotes: React.Dispatch<React.SetStateAction<Note[]>>
    fetchNotes: () => Promise<void>
}

export interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

export interface ChildrenType {
    children: JSX.Element
}

export interface Author {
    name: string;
    email: string;
}

export interface Note {
    id: number;
    title: string;
    author: Author;
    content: string;
}

export interface User {
    name: string,
    email: string,
    username: string, 
    password : string
}

export interface Credentials{
    username: string,
    password: string
}

interface loggedUser {
    token: string;
    username: string;
    email: string;
}

export interface LoginProps{
    user: loggedUser | null
    setUser: Dispatch<SetStateAction<null>>
}

export interface CreateProps{
    user: loggedUser| null
}
