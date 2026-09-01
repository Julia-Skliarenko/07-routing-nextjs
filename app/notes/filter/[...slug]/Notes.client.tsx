'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { NoteList } from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  // Реализация дебаунса для поиска (задержка 300мс)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Запрос через React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, perPage, debouncedSearch, initialTag],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch, initialTag),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div>
      {/* Кнопка открытия модального окна для создания новой заметки */}
      <button onClick={() => setIsModalOpen(true)}>Create Note</button>

      {/* Поиск с дебаунсом */}
      <SearchBox value={search} onChange={setSearch} />

      {/* Состояния загрузки и ошибки */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes.</p>}

      {/* Список заметок */}
      <NoteList notes={data?.notes || []} />

      {/* Пагинация */}
      <Pagination 
        currentPage={page} 
        totalPages={data?.totalPages || 1} 
        onPageChange={setPage} 
      />

      {/* Модальное окно для создания заметки с компонентом NoteForm */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}