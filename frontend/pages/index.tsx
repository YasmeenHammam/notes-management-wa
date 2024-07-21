"use client";

import React from "react";
import { useState, useEffect } from 'react';
import Pagination from '../components/pagination'
import PostsTable from '../components/postsTable'
import { Note } from "../components/types";
import ThemeToggle from '../components/theme';
import noteService from "../services/noteService";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

 
const POSTS_PER_PAGE: number = 10;

export default function Home() {
  const [currentNotes, setCurrentNotes] = useState<Note[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  const fetchNotes = async () => {
    const response = await noteService.get(activePage);
    try {
      const { count, notes } = response;
      setCurrentNotes(notes)
      const totalPagesCount: number = Math.ceil(count / POSTS_PER_PAGE);
      setNumOfPages(totalPagesCount);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [activePage])

  return (
    <ThemeToggle>
      <>

        <PostsTable notes={currentNotes} setCurrentNotes={setCurrentNotes} fetchNotes={fetchNotes} />
        <Pagination activePage={activePage} numOfPages={numOfPages} setActivePage={setActivePage} />

      </>
    </ThemeToggle>
  );

}