import './globals.css';

export const metadata = {
  title: 'The Fun Fan Reporter',
  description: 'Cyberpunk Event Intelligence Hub',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
