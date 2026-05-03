import './globals.css';
import RomanianBorder from '@/components/RomanianBorder';
import Header from '@/components/Header';

export const metadata = {
  title: 'Thea Enache',
  description: 'Personal website of Thea Enache',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
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
        <RomanianBorder />
        <Header />
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}