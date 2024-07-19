import { useContext, useState } from 'react';
import Post from "../components/post"
import { Note, Page } from './types';
import { ThemeContext } from './theme';
import CreateUser from '../components/createUser'
import Login from '../components/login'
import noteService from '@/services/noteService';


export default function PostsTable({ notes, fetchNotes }: Page) {
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

    // const handleAddClick = async (): Promise<void> => {
    //     try {
    //         await axios.post('http://localhost:3001/notes', { content: newContent });
    //         await refreshData();
    //         setNewContent('');
    //     } catch (error) {
    //         console.error('Error adding note:', error);
    //     }
    // };
    const handleAddClick = async () => {
        try {
            await noteService.create(newContent);
            await fetchNotes();
            setNewContent('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    // const handleDeleteNote = async (note: Note) => {
    //     try {
    //         await axios.delete(`http://localhost:3001/notes/${note.id}`);
    //         await fetchNotes();
    //     } catch (error) {
    //         console.error('Error deleteing note:', error);
    //     }
    // };
    const handleDeleteNote = async (note: Note) => {
        try {
            await noteService.remove(note);
            await fetchNotes();
        } catch (error) {
            console.error('Error deleteing note:', error);
        }
    };

    // const handleEditNote = async (note: Note) => {
    //     const updatedNote = { content: note.content };
    //     try {
    //         await axios.put(`http://localhost:3001/notes/${note.id}`, updatedNote);
    //         await fetchNotes();
    //     } catch (error) {
    //         console.error('Error editing note:', error);
    //     }
    // };

    const handleEditNote = async (note: Note) => {
        try {
            await noteService.update(note.id, note)
            await fetchNotes();
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };
    return (
        <>
            <main className={`${themeClass}`} >
                <header className="header">
                    Notes Page
                </header>
                <div className="form-container">
                    <CreateUser />
                    <Login />
                </div>
                <div className="add-button">
                    {addButton}
                </div>
                <div className="notes-grid">
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




