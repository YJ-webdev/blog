import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ClientPage } from './components/client-page';
import './globals.css';

import Nav from './components/nav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: '레인지 저널 | 다양한 정보를 한 곳에서 찾아보는 블로그 사이트.',
  description:
    '최신 정보와 다양한 주제를 한 곳에서 검색해 보세요. 간당 명료한 컨텐츠로 알고싶은 정보만 쏙 골라보는 유익한 공간 레인지저널 블로그 페이지 입니다. 가볍게 얻을 수 있는 생활 정보에서부터 전문적 지식이 담긴 찾기 힘든 정보와 개인의 노하우가 담긴 다양한 주제의 블로그로 하나의 커뮤니티를 생성 하는 곳. 나누고 싶은 정보가 있거나 본인만의 경험담을 글로 남기고 싶으신가요? 그렇다면 이 사이트에 기자로 등록해주세요.',
  openGraph: {
    images: `/images/default-image.jpg`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'false';

  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
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
    take: 11,
    orderBy: {
      id: 'asc',
    },
  });

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
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar posts={posts} tags={tags} />
            <main>
              <SidebarTrigger className="bg-transparent hover:bg-transparent w-fit" />
              <Nav />
              <ClientPage userId={userId}> {children}</ClientPage>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
