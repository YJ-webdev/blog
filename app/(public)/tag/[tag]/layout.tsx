import Head from 'next/head';

export default function TagLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta property="og:title" content="주제별 포스트 목록" />
        <meta
          property="og:description"
          content="읽고싶은 아티클을 주제별로 찾아보세요. "
        />
        <meta property="og:image" content="/images/default-image.jpg" />
      </Head>
      {children}
    </>
  );
}
