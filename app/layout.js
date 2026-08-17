import './globals.css';
import Header from '@/components/Header';
import { getSearchIndex } from '@/lib/searchIndex';

export const metadata = {
  title: 'Thea Enache',
  description: 'Personal website of Thea Enache',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  const searchIndex = getSearchIndex();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@400;500&family=Inter:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header searchIndex={searchIndex} />
        <main style={{ paddingTop: '76px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}