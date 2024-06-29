"use client";
import React from "react";
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Pagination from './pagination'
import PostsTable from './postsTable'
import './styles.css';
import { Note } from "./types";
import ThemeToggle from './theme';



const POSTS_PER_PAGE: number = 10;
const NOTES_URL: string = 'http://localhost:3001/notes';

export default function Home() {
  const [currentNotes, setCurrentNotes] = useState<Note[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);


  useEffect(() => {
    const promise = axios.get(NOTES_URL)

    promise.then(response => {
      const totalCount = response.data.length;
      const totalPagesCount: number = Math.ceil(totalCount / POSTS_PER_PAGE);
      setNumOfPages(totalPagesCount);
      setCurrentNotes(response.data);
    }).catch(error => { console.log("Encountered an error:" + error) });
  }, [activePage]);

  return (
    <ThemeToggle>
      <>
        <PostsTable notes={currentNotes} setCurrentNotes={setCurrentNotes} />
        <Pagination activePage={activePage} numOfPages={numOfPages} setActivePage={setActivePage} />
      </>

    </ThemeToggle>
  );

}