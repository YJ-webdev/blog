import { readFileSync } from 'fs';
import { join } from 'path';
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const imageData = readFileSync(
    join(process.cwd(), `public/images/tag/${decodedTag}.jpg`),
  );
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: 32,
          overflow: 'hidden',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        {/* Left: Image */}
        <div
          style={{
            width: '50%',
            height: '100%',
            backgroundImage: `url(data:image/jpeg;base64,${imageData.toString('base64')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
          }}
        />

        {/* Right: Text card */}
        <div
          style={{
            width: '50%',
            height: '100%',
            backgroundColor: 'white',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              color: '#111',
              margin: 0,
              marginBottom: 24,
              lineHeight: 1.3,
              fontWeight: 700,
            }}
          >
            애쉬저널 | 지식 공유 블로그
          </h1>
          <p
            style={{
              fontSize: 34,
              color: '#444',
              lineHeight: 1.5,
            }}
          >
            {`${decodedTag}을/를 주제로한 블로그 모아 보기`}
          </p>
        </div>
      </div>
    ),
    size,
  );
}
