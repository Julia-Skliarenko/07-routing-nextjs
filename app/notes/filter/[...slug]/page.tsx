import NotesClient from './Notes.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const rawTag = slug[0];

  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={rawTag} />
    </HydrationBoundary>
  );
}