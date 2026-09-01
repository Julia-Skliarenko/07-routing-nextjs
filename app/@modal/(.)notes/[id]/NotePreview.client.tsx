'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // <-- Установлено в false, чтобы избежать повторного запроса предзагруженных данных
  });

  const handleClose = () => {
    router.back(); // Закрытие через возвращение назад по истории роутера
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div>
        <button onClick={handleClose}>Close ✕</button>

        {isLoading && <p>Loading note details...</p>}
        {error && <p>Error loading note details.</p>}

        {note && (
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {/* Отображаем tag и createdAt */}
            {note.tag && <p>Tag: {note.tag}</p>}
            {note.createdAt && <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>}
          </div>
        )}
      </div>
    </Modal>
  );
}