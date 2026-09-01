export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
      <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
        {sidebar}
      </aside>
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}