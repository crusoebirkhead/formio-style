import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Form.io Theme Preview',
  description: 'Gryphon Custom Theme — Form.io component showcase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
