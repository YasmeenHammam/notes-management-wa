import React, { useState  } from 'react';
import '../styles/style.css';

interface PaginationProps {
    activePage: number;
    numOfPages: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  }

export default function Pagination({ activePage, numOfPages ,setActivePage} : PaginationProps) {

    const getPageRange = (): number[] => {
        if (numOfPages <= 5) {
            return Array.from({ length: numOfPages }, (_, i) => i + 1);
        } else if (activePage < 3) {
            return [1, 2, 3, 4, 5];
        } else if (activePage >= 3 && activePage <= numOfPages - 2) {
            return [activePage - 2, activePage - 1, activePage, activePage + 1, activePage + 2];
        } else {
            return Array.from({ length: 5 }, (_, i) => numOfPages - 4 + i);
        }
    };

    const handlePageClick = (pageNumber: number): void => {
        setActivePage(pageNumber);
    };

 

    return (
        <>
        <div className="pagination">
            <button name = "first" onClick={() => handlePageClick(1)} disabled={activePage === 1}>First</button>
            <button name = "previous" onClick={() => handlePageClick(activePage - 1)} disabled={activePage === 1}>Prev</button>
            <>
                {getPageRange().map(page => (
                    <button name = {`page-${page}`} key={page} onClick={() => handlePageClick(page)} className={page === activePage ? 'active' : ''}>{page}</button>
                ))}
            </>
            <button name = "next" onClick={() => handlePageClick(activePage + 1)} disabled={activePage === numOfPages}>Next</button>
            <button name="last" onClick={() => handlePageClick(numOfPages)} disabled={activePage === numOfPages}>Last</button>
            
            </div>
        </>
    );
};
