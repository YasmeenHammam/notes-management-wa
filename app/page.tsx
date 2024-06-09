"use client";
import React from "react";
import { useState , useEffect} from 'react';
import axios from 'axios';
import Pagination from './pagination'



const POSTS_PER_PAGE: number = 10;
const NOTES_URL:string = 'http://localhost:3001/notes';

interface Author {
  name: string;
  email: string;
}

interface Note {
  id: number;
  title: string;
  author: Author;
  content: string;
}

interface Page {
  notes: Note[];
}

interface PaginationProps {
  activePage: number;
  numOfPages: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

interface HandleProps {
  newPageNum: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

function PostsTable({ notes }: Page) {
  return (
    <>
      <main className="min-h-screen p-24">
        <header className="text-3xl font-bold mb-8 text-center">
            Notes Page
        </header>
      <div className="grid grid-cols-2 gap-4 ">
          <Post notes={notes} />
        </div>
      </main>
    </>
  );
}

function Post({ notes }: Page) {
  return (
    <>
      {notes.map((note) => (
        <div className="post" id={note.id.toString()} >
          <h2>{note.title}</h2>
          <small>By : {note.author.name}</small>
          <br />
          <small> {note.author.email}</small>
          <p>{note.content}</p>
          <hr />
        </div>
      ))}
    </>
  );
}


export default function Home() {

  const [currentNotes, setCurrentNotes] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  
      
  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
        params: {
          _page: activePage,
          _per_page: POSTS_PER_PAGE
        }});
    promise.then(response => { 
      const totalCount:number = parseInt(response.headers['x-total-count']);
      const totalPagesCount:number = Math.ceil(totalCount / POSTS_PER_PAGE);
      setNumOfPages(totalPagesCount);
      setCurrentNotes(response.data);
    }).catch(error => { console.log("Encountered an error:" + error)});
  }, [activePage]);
  
  return (
  <>
     <PostsTable notes = {currentNotes} />
     <Pagination activePage = {activePage} numOfPages = {numOfPages} setActivePage = {setActivePage}/>
  </>
  );

}