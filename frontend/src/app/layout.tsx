import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import TopNavbar from '@/components/layout/TopNavbar';

export const metadata: Metadata = {
  title: 'MINERALIS — Mining Intelligence Platform - Operations & Geological Vault',
  description: 'AI-powered geological, mining, and statutory reporting intelligence platform.',
  icons: {
    icon: '/mineralis_mark.png',
    shortcut: '/mineralis_mark.png',
    apple: '/mineralis_mark.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f6f8fb] text-slate-900 antialiased flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <TopNavbar />
            <main className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
