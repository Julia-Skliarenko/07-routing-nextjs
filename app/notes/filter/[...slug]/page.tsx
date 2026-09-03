import NotesClient from './Notes.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];
  
  const tagFromUrl = slugArray[0] || 'all';
  
  const apiTag = tagFromUrl.toLowerCase() === 'all' ? '' : tagFromUrl;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, '', apiTag],
    queryFn: () => fetchNotes(1, 12, '', apiTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={apiTag} />
    </HydrationBoundary>
  );
}