export interface PostProps {
    note: Note;
    handleDeleteNote: (note: Note) => void;
    handleEditNote: (note: Note) => void;

}

export interface Page {
    notes: Note[];
    setCurrentNotes: React.Dispatch<React.SetStateAction<Note[]>>
    refreshData: () => Promise<void>
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