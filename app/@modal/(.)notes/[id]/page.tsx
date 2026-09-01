'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview.client';

interface InterceptedNoteModalProps {
  params: Promise<{ id: string }>;
}

export default function InterceptedNoteModal({ params }: InterceptedNoteModalProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <NotePreview id={resolvedParams.id} />
    </Modal>
  );
}