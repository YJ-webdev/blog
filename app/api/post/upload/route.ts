import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ['image/*'], // Accepts PNG, JPEG, WebP, etc.
          tokenPayload: JSON.stringify({
            userId: session.user.id,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const { userId } = JSON.parse(tokenPayload as string);
        console.log('✅ Upload completed:', blob.url, 'for user:', userId);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('⛔ Upload handler error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
