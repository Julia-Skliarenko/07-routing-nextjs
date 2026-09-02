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
  const tagFromUrl = slug?.[0] || 'all';
  const apiTag = tagFromUrl.toLowerCase() === 'all' ? '' : tagFromUrl.toLowerCase();

  const queryClient = new QueryClient();

  await queryClient.ensureQueryData({
    queryKey: ['notes', 1, 12, ''],
    queryFn: () => fetchNotes(1, 12, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={apiTag} />
    </HydrationBoundary>
  );
}