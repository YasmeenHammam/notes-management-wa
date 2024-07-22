"use client";

import React, { act } from "react";
import { useState, useEffect } from 'react';
import Pagination, { getPageRange } from '../components/pagination'
import PostsTable from '../components/postsTable'
import { Note, HomeProps } from "../components/types";
import ThemeToggle from '../components/theme';
import noteService from "../services/noteService";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { POSTS_PER_PAGE } from "../utils/consts";


export const getStaticProps = (async () => {
  const response = await noteService.get(1);
  const { count, notes } = response;
  const totalPagesCount: number = Math.ceil(count / POSTS_PER_PAGE);
  return {
    props: {
      initialNotes: notes,
      initialNumOfPages: totalPagesCount,
    },
  };
}) satisfies GetStaticProps<HomeProps>;


export default function Home({ initialNotes, initialNumOfPages }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentNotes, setCurrentNotes] = useState<Note[]>(initialNotes);
  const [activePage, setActivePage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(initialNumOfPages);
  const [cache, setCache] = useState<Map<number, Note[]>>(new Map([[1, initialNotes]]));

  const fetchNotes = async (page: number) => {
    const response = await noteService.get(page);
    const { count, notes } = response;
    const totalPagesCount: number = Math.ceil(count / POSTS_PER_PAGE);
    return { totalPagesCount, notes };
  }

  const FetchAndUpdateNotes = async () => {
    let currentActivePage = activePage;
    let count = numOfPages;
    const pages = getPageRange({ activePage: currentActivePage, numOfPages: numOfPages });
    const newCache = new Map();
    for (let i = 0; i < pages.length; i++) {
      const notesFromCache = cache.get(pages[i]);
      if (notesFromCache) {
        newCache.set(pages[i], notesFromCache);
      } else {
        const { totalPagesCount, notes } = await fetchNotes(pages[i]);
        newCache.set(pages[i], notes);
        count = totalPagesCount;
      }
    }
    setCache(newCache);
    setActivePage(currentActivePage);
    setNumOfPages(count);
    setCurrentNotes(newCache.get(currentActivePage));
  };

  useEffect(() => {
    FetchAndUpdateNotes();
  }, [activePage]);


  return (
    <ThemeToggle>
      <>
        <PostsTable notes={currentNotes} setCurrentNotes={setCurrentNotes} fetchNotes={() => FetchAndUpdateNotes()} />
        <Pagination activePage={activePage} numOfPages={numOfPages} setActivePage={setActivePage} />
      </>
    </ThemeToggle>
  );

}
