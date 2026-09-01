'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const tagParam = !initialTag || initialTag === 'all' ? undefined : initialTag;

  // Убираем сложную логику гидратации с клиента, если она ломается, 
  // и делаем прямой стабильный запрос через useQuery
  const { data, isPending, error } = useQuery({
    queryKey: ['notes', page, search, tagParam],
    queryFn: () => fetchNotes(page, 12, search, tagParam),
  });

  if (error) {
    return <div className={css.container}><p>Error loading notes: {error.message}</p></div>;
  }

  return (
    <div className={css.container}>
      <SearchBox value={search} onChange={(val) => { setSearch(val); setPage(1); }} />

      <h1 className={css.title}>
        Notes {initialTag && initialTag !== 'all' ? `(${initialTag})` : '(All)'}
      </h1>
      
      {isPending ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList notes={data?.notes || []} />
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={data.totalPages} 
          onPageChange={setPage} 
        />
      )}
    </div>
  );
}