// app/test-og/page.tsx
export const metadata = {
  title: 'Test OG',
  openGraph: {
    title: 'Test OG Title',
    description: 'Test OG Description for mobile',
    url: 'https://your-site.com/test-og',
    images: [
      {
        url: 'https://your-site.com/static/test.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function TestOGPage() {
  return <div>Test Open Graph Page</div>;
}
