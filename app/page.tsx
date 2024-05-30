"use client";
import Head from "next/head";
import React from "react";
import { useState , useEffect} from 'react';
import axios from 'axios';

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

interface Pages {
  pages: Page[];
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
      <Head>
        <title>Notes Page</title>
      </Head>
      <main className="min-h-screen p-24">
        <header className="text-3xl font-bold mb-8">
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
    <div>
      {notes.map((note) => (
        <div key={note.id} className="note">
          <h2>{note.title}</h2>
          <p>{note.author.name}</p>
          <p>{note.author.email}</p>
          <p>{note.content}</p>
          <hr
            style={{
              margin: "20px 0",
              border: "none",
              borderTop: "1px solid #ccc",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Pagination({ activePage, numOfPages ,setActivePage} : PaginationProps) {
  const renderPageButtons = () => {
    if (activePage === 1) {
      return (
        <div>
          <button name="first" >{"<<"}</button>
          <button name="previous" >{"<"}</button>
          <button name="page-1" className="active" >1</button>
          <button name="page-2" onClick = {() => handleClick({newPageNum :2,setActivePage})}>2</button>
          <button name="page-3" onClick={() => handleClick({ newPageNum: 3, setActivePage })}>3</button>
          <button name="page-4" onClick={() => handleClick({ newPageNum: 4, setActivePage })}>4</button>
          <button name="page-5" onClick={() => handleClick({ newPageNum: 5, setActivePage })}>5</button>
          <button name="next" onClick={() => handleClick({ newPageNum: activePage + 1, setActivePage })}>{">"}</button>
          <button name="last" onClick={() => handleClick({ newPageNum: numOfPages, setActivePage })}>{">>"}</button>
        </div>
      );
    } else if (activePage === 2) {
      return (
        <div>
          <button name="first" onClick = {() => handleClick({newPageNum :1,setActivePage})}>{"<<"}</button>
          <button name="previous" onClick = {() => handleClick({newPageNum :activePage - 1,setActivePage})}>{"<"}</button>
          <button name="page-1" onClick={() => handleClick({ newPageNum: 1, setActivePage })}>1</button>
          <button name="page-2" className="active">2</button>
          <button name="page-3" onClick={() => handleClick({ newPageNum: 3, setActivePage })}>3</button>
          <button name="page-4" onClick={() => handleClick({ newPageNum: 4, setActivePage })}>4</button>
          <button name="page-5" onClick={() => handleClick({ newPageNum: 5, setActivePage })}>5</button>
          <button name="next" onClick={() => handleClick({ newPageNum: activePage + 1, setActivePage })}>{">"}</button>
          <button name="last" onClick={() => handleClick({ newPageNum: numOfPages, setActivePage })}>{">>"}</button>
        </div>
      );
    } else if (activePage === numOfPages - 1) {
      return (
        <div>
          <button name="first" onClick = {() => handleClick({newPageNum :1,setActivePage})}>{"<<"}</button>
          <button name="previous" onClick = {() => handleClick({newPageNum :activePage - 1,setActivePage})}>{"<"}</button>
          <button name={`page-${numOfPages - 4}`} onClick={() => handleClick({ newPageNum: numOfPages - 4, setActivePage })}>{numOfPages - 4}</button>
          <button name={`page-${numOfPages - 3}`} onClick={() => handleClick({ newPageNum: numOfPages - 3, setActivePage })}>{numOfPages - 3}</button>
          <button name={`page-${numOfPages - 2}`} onClick={() => handleClick({ newPageNum: numOfPages - 2, setActivePage })}>{numOfPages - 2}</button>
          <button name={`page-${numOfPages - 1}`} className="active">{numOfPages - 1}</button>
          <button name={`page-${numOfPages}`} onClick={() => handleClick({ newPageNum: numOfPages, setActivePage })}>{numOfPages}</button>
          <button name="next" onClick={() => handleClick({ newPageNum: activePage + 1, setActivePage })}>{">"}</button>
          <button name="last" onClick={() => handleClick({ newPageNum: numOfPages, setActivePage })}>{">>"}</button>
        </div>
      );
    } else if (activePage === numOfPages) {
      return (
        <div>
          <button name="first" onClick = {() => handleClick({newPageNum :1,setActivePage})}>{"<<"}</button>
          <button name="previous" onClick = {() => handleClick({newPageNum :activePage - 1,setActivePage})}>{"<"}</button>
          <button name={`page-${numOfPages - 4}`} onClick={() => handleClick({ newPageNum: numOfPages - 4, setActivePage })}>{numOfPages - 4}</button>
          <button name={`page-${numOfPages - 3}`} onClick={() => handleClick({ newPageNum: numOfPages - 3, setActivePage })}>{numOfPages - 3}</button>
          <button name={`page-${numOfPages - 2}`} onClick={() => handleClick({ newPageNum: numOfPages - 2, setActivePage })}>{numOfPages - 2}</button>
          <button name={`page-${numOfPages - 1}`} onClick={() => handleClick({ newPageNum: numOfPages - 1, setActivePage })}>{numOfPages - 1}</button>
          <button name={`page-${numOfPages}`} className="active">{numOfPages}</button>
          <button name="next" >{">"}</button>
          <button name="last" >{">>"}</button>
        </div>
      );
    } else {
      return (
        <div>
          <button name="first" onClick = {() => handleClick({newPageNum :1,setActivePage})}>{"<<"}</button>
          <button name="previous" onClick = {() => handleClick({newPageNum :activePage - 1,setActivePage})}>{"<"}</button>
          <button name={`page-${activePage - 2}`} onClick={() => handleClick({ newPageNum: activePage - 2, setActivePage })}>{activePage - 2}</button>
          <button name={`page-${activePage - 1}`} onClick={() => handleClick({ newPageNum: activePage - 1, setActivePage })}>{activePage - 1}</button>
          <button name={`page-${activePage}`} className="active">{activePage}</button>
          <button name={`page-${activePage + 1}`} onClick={() => handleClick({ newPageNum: activePage + 1, setActivePage })}>{activePage + 1}</button>
          <button name={`page-${activePage + 2}`} onClick={() => handleClick({ newPageNum: activePage + 2, setActivePage })}>{activePage + 2}</button>
          <button name="next" onClick={() => handleClick({ newPageNum: activePage + 1, setActivePage })}>{">"}</button>
          <button name="last" onClick={() => handleClick({ newPageNum: numOfPages, setActivePage })}>{">>"}</button>
        </div>
      );
    }
  }

  return (
    <>
      <div>
        
      
      {renderPageButtons()}
      
        
      </div>
    </>
  );
}

function handleClick({newPageNum, setActivePage}: HandleProps){
  setActivePage(newPageNum);
}

export default function App() {
  const [currentNotes, setCurrentNotes] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const numOfPages:number = 6;
  
  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
        params: {
          _page: activePage,
          _per_page: POSTS_PER_PAGE
        }});
    promise.then(response => { 
      setCurrentNotes(response.data);
    }).catch(error => { console.log("Encountered an error:" + error)});
});
  return (
  <div>
     <PostsTable notes={currentNotes} />
     <Pagination activePage = {activePage} numOfPages = {numOfPages} setActivePage = {setActivePage}/>
  </div>
  );

}