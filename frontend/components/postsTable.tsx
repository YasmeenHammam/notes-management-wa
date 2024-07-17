import { useContext, useState } from 'react';
import axios from 'axios';
import Post from "../components/post"
import { Note, Page } from './types';
import { ThemeContext } from './theme';


export default function PostsTable({ notes, refreshData }: Page) {
    const [newContent, setNewContent] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const theme = useContext(ThemeContext);
    const themeClass = theme == 'light' ? 'lightThemeStyle' : 'darkThemeStyle';
    let addButton;
    if (isAdding) {
        addButton = (
            <>
                <input name='text_input_new_note'
                    type='text'
                    value={newContent}
                    onChange={(e) => {
                        setNewContent(e.target.value);
                    }}
                />
                <>
                    <button name="text_input_save_new_note"
                        onClick={async () => {
                            handleAddClick();
                            setIsAdding(false);
                        }}>Save</button>
                </>
                <>
                    <button name="text_input_cancel_new_note"
                        onClick={() => {
                            setNewContent('');
                            setIsAdding(false);
                        }}> Cancel</button>
                </>
            </>

        )
    } else {
        addButton = <button name="add_new_note" onClick={() => {
            setIsAdding(true)
        }}>Add new note</button>
    }

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
            <main className={`min-h-screen p-4 ${themeClass}`} >
                <header className="text-3xl font-bold mb-8 text-center">
                    Notes Page
                </header>
                <div >
                    <div className="add-button">
                        {addButton}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {notes.map((note) => (
                        <div key={note.id.toString()}>
                            <Post note={note} handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote} />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}




