import type { Metadata } from 'next';

export const metadata: Metadata = {
  manifest: '/pwa/manifest.json',
  title: 'Spion Trade',
  description:
    'Automação de perações binárias. Melhores estratégias automatizadas do mundo!',
  keywords: [
    'dinheiro',
    'renda extra',
    'trade',
    'trader',
    'day trade',
    'operações binárias',
  ],
};

import { Providers } from './contexts/providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
