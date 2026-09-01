import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import ModalContent from './ModalContent.client';

interface InterceptedNotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterceptedNotePage({ params }: InterceptedNotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <ModalContent>
      <NotePreview note={note} />
    </ModalContent>
  );
}