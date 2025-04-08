import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ClientPage } from './components/client-page';
import './globals.css';

import Nav from './components/nav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    take: 10,
    select: {
      id: true,
      slug: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const tags = await prisma.tag.findMany({
    take: 14,
    orderBy: {
      id: 'asc',
    },
  });

  const session = await auth();
  const user = session?.user;
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <SessionProvider session={session}>
              <AppSidebar posts={posts || null} tags={tags || null} />
            </SessionProvider>
            <main>
              <SidebarTrigger className="hidden md:block md:-mt-7 bg-transparent hover:bg-transparent" />
              <Nav
                user={user || null}
                posts={posts || null}
                tags={tags || null}
              />
              <ClientPage> {children}</ClientPage>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
