import { readFileSync } from 'fs';
import { join } from 'path';
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const imageData = readFileSync(
    join(process.cwd(), 'public/images/default-image.jpg'),
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
              fontSize: 32,
              color: '#444',
              lineHeight: 1.5,
            }}
          >
            유용하고 정확한 정보를 한 곳에서 만나보세요. 가볍게 얻을 수 있는
            생활 정보에서부터 전문적 지식이 담긴 찾아보기 힘든 정보와 개인의
            노하우가 담긴 다양한 주제의 블로그로 하나의 커뮤니티를 생성 하는 곳.
            나누고 싶은 정보가 있거나 본인만의 경험담을 글로 남기고 싶으시다면
            블로그 작가로도 활동하실 수도 있습니다.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
