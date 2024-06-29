import { useContext, useState } from 'react';
import axios from 'axios';
import Post from "./post"
import { Note, Page } from './types';
import { ThemeContext } from './theme';


export default function PostsTable({ notes, setCurrentNotes }: Page) {
    const [customId, setCustomId] = useState(1);
    const [newContent, setNewContent] = useState('');
    const theme = useContext(ThemeContext);
    const themeClass = theme == 'light' ? 'lightThemeStyle' : 'darkThemeStyle';


    const handleAddClick = async (): Promise<void> => {
        const note = {
            id: customId,
            title: `Note ${customId}`,
            author: {
                name: `Author ${customId}`,
                email: `mail_${customId}@gmail.com`,
            },
            content: newContent,
        };
        try {
            const newNote = await axios.post('http://localhost:3001/notes', note);
            const response = await axios.get('http://localhost:3001/notes');
            setCurrentNotes(response.data);
            setCustomId(id => id + 1);
            setNewContent('');

            // setCurrentNotes(notes => [...notes, newNote.data]);

        } catch (error) {
            console.error('Error adding note:', error);
        }

    };

    const handleDeleteNote = async (note: Note) => {
        await axios.delete(`http://localhost:3001/notes/${note.id}`);
        const response = await axios.get('http://localhost:3001/notes');
        setCurrentNotes(response.data);

        // setCurrentNotes(notes => notes.filter(n => n.id !== note.id));

    };

    const handleEditNote = async (note: Note) => {
        const updatedNote = { content: note.content };
        try {
            await axios.put(`http://localhost:3001/notes/${note.id}`, updatedNote);
            const response = await axios.get('http://localhost:3001/notes');
            setCurrentNotes(response.data);
        } catch (error) {

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
                            <button name="add new note"
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




