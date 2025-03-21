import { publishPost } from '@/app/lib/actions/post';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    await publishPost(formData);

    return new Response(
      JSON.stringify({ message: 'Post updated successfully' }),
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating post:', error.message);
      return new Response(
        JSON.stringify({
          message: 'Error updating post',
          error: error.message,
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error occurred:', error);
      return new Response(
        JSON.stringify({
          message: 'Error updating post',
          error: 'Unknown error',
        }),
        { status: 500 },
      );
    }
  }
}
