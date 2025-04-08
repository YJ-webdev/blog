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

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title:
    '애쉬저널 | 지식 공유 블로그 애쉬저널에서 유용하고 정확한 정보를 찾으세요!',
  description:
    '최신 정보와 다양한 주제를 한 곳에서 검색해 보세요. 간당 명료한 컨텐츠로 알고싶은 정보만 쏙 골라보는 유익한 공간 레인지저널 블로그 페이지 입니다. 가볍게 얻을 수 있는 생활 정보에서부터 전문적 지식이 담긴 찾아보기 힘든 정보와 개인의 노하우가 담긴 다양한 주제의 블로그로 하나의 커뮤니티를 생성 하는 곳. 나누고 싶은 정보가 있거나 본인만의 경험담을 글로 남기고 싶으신가요? 그렇다면 이 사이트에 기자로 등록해주세요.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_URL!),
};

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
