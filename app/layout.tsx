import type { Metadata } from 'next';
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: '애쉬저널 | 지식 공유 블로그',
  description:
    '일상에 필요한 생활 정보에서부터 전문적 지식이 담긴 주제의 이야기까지 블로그 하나로 커뮤니티를 생성 하는 곳.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_URL!),
  openGraph: {
    images: [
      {
        width: '1200',
        height: '630',
        alt: `메인 페이지 이미지`,
        type: 'image/jpg',
        url: `/images/default-image.jpg`,
      },
    ],
  },
  other: {
    'naver-site-verification': '640268bc6657654ab1509bc3533928003d279c12',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await prisma.post.findMany({
    cacheStrategy: { ttl: 60 },
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
    cacheStrategy: { ttl: 60 },
    take: 14,
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    include: {
      _count: {
        select: { posts: true },
      },
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
