import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'Next.js notes application',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode; // <-- Добавили тип для модального слота
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal} {/* <-- Отрендерили параллельный слот роута */}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}