import { useReducer, useState } from 'react';
import notesReducer from "./notesReducer";
import axios from 'axios';


interface Page {
    notes: Note[];
    setCurrentNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

interface PostProps {
    note: Note;
    onDelete: (note: Note) => void;
    onChange: (note: Note) => void;

}

interface Author {
    name: string;
    email: string;
}

export interface Note {
    id: number;
    title: string;
    author: Author;
    content: string;
}



export default function PostsTable({ notes, setCurrentNotes }: Page) {
    // const [posts, dispatch] = useReducer(notesReducer, notes);
    const [customId, setCustomId] = useState(1);

    const handleAddClick = (): void => {
        const note = {
            id: customId,
            title: `Note ${customId}`,
            author: {
                name: `Author ${customId}`,
                email: `mail_${customId}@gmail.com`,
            },
            content: `Content for note ${customId}`,
        };
        axios.post('http://localhost:3001/notes', note)
            .then(() => {
                setCurrentNotes(notes => [...notes, note])
            })
            .catch(error => {
                console.error('Error adding note:', error);
            })
        setCustomId(id => id + 1);
    };


    const handleDeleteNote = (note: Note) => {
        axios.delete(`http://localhost:3001/notes/${note.id}`)
            .then(() => {
                setCurrentNotes(notes => notes.filter(n => n.id !== note.id));
            })
            .catch(error => {
                console.error('Error deleting note:', error);
            });
    };


    const handleEditNote = (note: Note) => {
    };

    return (
        <>
            <main className="min-h-screen p-24">
                <header className="text-3xl font-bold mb-8 text-center">
                    Notes Page
                </header>
                <div className="add-button">
                    <button name="add new note" onClick={() => handleAddClick()} >Add new note</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {notes.map((note) => (
                        <Post note={note} onDelete={handleDeleteNote} onChange={handleEditNote} />
                    ))}
                </div>
            </main>
        </>
    );
}



function Post({ note, onDelete, onChange }: PostProps) {
    const [isEditing, setIsEditing] = useState(false);
    let noteContent;
    let noteButton;
    if (isEditing) {
        noteContent = (
            <>
                <input
                    value={note.content}
                    onChange={(e) => {
                        onChange({
                            ...note,
                            content: e.target.value,
                        });
                    }}
                />
            </>
        );
        noteButton = <button onClick={() => setIsEditing(false)}>Save</button>
    } else {
        noteContent = (
            <>
                {note.content}
            </>
        );
        noteButton = <button onClick={() => setIsEditing(true)}>Edit</button>
    }
        return (
            <>
                <div className="note" id={note.id.toString()} >
                    <h2>{note.title}</h2>
                    <small>By : {note.author.name}</small>
                    <br />
                    <small> {note.author.email}</small>
                    <p>{noteContent}</p>
                    <div className="pagination">
                        {noteButton}
                        <button name="delete" onClick={() => onDelete(note)} >Delete</button>
                    </div>
                    <hr />
                </div>
            </>
        );
}
