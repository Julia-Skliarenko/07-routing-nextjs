'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api'; 
import Modal from '@/components/Modal/Modal'; 

interface InterceptedNoteModalProps {
  params: Promise<{ id: string }>;
}

export default function InterceptedNoteModal({ params }: InterceptedNoteModalProps) {
  const router = useRouter();
  
  const resolvedParams = React.use(params);
  const noteId = resolvedParams.id;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <p>Failed to load note.</p>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </Modal>
  );
}