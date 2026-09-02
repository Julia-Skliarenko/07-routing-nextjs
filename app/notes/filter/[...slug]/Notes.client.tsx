'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { NoteList } from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  // Используем initialTag, переданный с сервера, чтобы на первом рендере не было рассинхрона
  const activeTag = initialTag.toLowerCase() === 'all' ? '' : initialTag.toLowerCase();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, perPage, debouncedSearch],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch),
    placeholderData: (previousData) => previousData,
  });

  const allNotes = data?.notes || [];
  const filteredNotes = activeTag 
    ? allNotes.filter((note) => note.tag?.toLowerCase() === activeTag) 
    : allNotes;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        
        <Pagination 
          currentPage={page} 
          totalPages={data?.totalPages || 1} 
          onPageChange={setPage} 
        />

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes.</p>}

      <NoteList notes={filteredNotes} />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}