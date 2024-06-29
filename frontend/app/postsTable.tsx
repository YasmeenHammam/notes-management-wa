import { useContext, useState } from 'react';
import axios from 'axios';
import Post from "./post"
import { Note, Page } from './types';
import { ThemeContext } from './theme';


export default function PostsTable({ notes, refreshData }: Page) {
    const [newContent, setNewContent] = useState('');
    const theme = useContext(ThemeContext);
    const themeClass = theme == 'light' ? 'lightThemeStyle' : 'darkThemeStyle';


    const handleAddClick = async (): Promise<void> => {
        try {
            await axios.post('http://localhost:3001/notes', { content: newContent });
            await refreshData();
            setNewContent('');
        } catch (error) {
            console.error('Error adding note:', error);
        }

    };

    const handleDeleteNote = async (note: Note) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${note.id}`);
            await refreshData();
        } catch (error) {
            console.error('Error deleteing note:', error);
        }
    };

    const handleEditNote = async (note: Note) => {
        const updatedNote = { content: note.content };
        try {
            await axios.put(`http://localhost:3001/notes/${note.id}`, updatedNote);
            await refreshData();
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    return (
        <>
            <main className={`min-h-screen p-24 ${themeClass}`} >
                <header className="text-3xl font-bold mb-8 text-center">
                    Notes Page
                </header>
                <div >
                    <input
                        type='text'
                        value={newContent}
                        onChange={(e) => {
                            setNewContent(e.target.value);
                        }}
                    />
                    <div className="add-button">
                        <button name="add_new_note"
                            onClick={() => {
                                handleAddClick();
                            }}>Add new note</button></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {notes.map((note) => (
                        <Post note={note} handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote} />
                    ))}
                </div>
            </main>
        </>
    );
}




