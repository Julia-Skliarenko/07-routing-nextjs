import NotesClient from './Notes.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const rawTag = slug?.[0] || 'all';

  const queryClient = new QueryClient();

  // Вызываем prefetchQuery с правильным порядком аргументов из твоего api.ts:
  // (page, perPage, search, tag)
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, '', rawTag],
    queryFn: () => fetchNotes(1, 12, '', rawTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={rawTag} />
    </HydrationBoundary>
  );
}