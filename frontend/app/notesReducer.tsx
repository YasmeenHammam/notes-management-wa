import axios from 'axios';
import { Note } from './postsTable';
import { useState } from 'react';

  
type Action =
  | { type: "ADD", payload: Note }
  | { type: "DELETE", payload: Note };


export default function notesReducer(notes: Note[], action: Action): Note[] {
  switch (action.type) {
    case "ADD": {
      return [...notes, action.payload];

    }
    case "DELETE": {
      const newNotes = notes.filter(note => note.id !== action.payload.id);
      return newNotes;
    }
    default: {
      return notes;
    }
  }
}
