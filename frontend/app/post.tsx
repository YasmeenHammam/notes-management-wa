import { useState } from "react";
import { PostProps } from "./types";

export default function Post({ note, handleDeleteNote, handleEditNote }: PostProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(note.content);

    let noteContent;
    let noteButton;
    if (isEditing) {
        noteContent = (
            <>
                <input name={`text_input-${note.id}`}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
            </>
        );
        noteButton =
            <>
            <button name={`text_input_save-${note.id}`}
                onClick={() => {
                    setIsEditing(false);
                    handleEditNote({ ...note, content: content })
                }}>Save</button>
            <button name={`text_input_cancel-${note.id}`}
                onClick={() => {
                    setContent(note.content);
                    setIsEditing(false);
                }}> Cancel</button>
            </>
    } else {
        noteContent = (
            <>
                {note.content}
            </>
        );
        noteButton = <button name={`edit-${note.id}`} onClick={() => {
            setIsEditing(true) 
            setContent(note.content)
        }}>Edit</button>
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
                    <button name={`delete-${note.id}`} onClick={() => handleDeleteNote(note)} >Delete</button>
                </div>
                <hr />
            </div>
        </>
    );
}