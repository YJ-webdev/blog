'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return post;
}

export const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      authorId: true,
      tags: true,
      links: true,
      published: true,
    },
  });
  return post;
};

export async function createPost() {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const latestPost = await prisma.post.findFirst({
    where: {
      authorId: user.id,
      published: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (latestPost) {
    return latestPost;
  }

  const newPost = await prisma.post.create({
    data: {
      authorId: user.id,
      published: false,
      tags: [],
    },
  });

  return newPost; // Return the new post
}

export async function publishPost(formData: FormData): Promise<void> {
  const user = await currentUser();
  if (!user) throw new Error('User not authenticated');

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const image = formData.get('image') as string | null;
  const content = formData.get('content') as string;

  if (!id || !title || !content) {
    throw new Error('Required fields are missing');
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!post || post.authorId !== user.id) {
    return console.log('User is not authorized to edit this post');
  }

  await prisma.post.update({
    where: { id },
    data: { title, image: image ?? undefined, content, published: true },
  });
}

export async function deletePost(postId: string) {
  const user = await currentUser();
  if (!user) return redirect('/login');

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== user.id) {
    throw new Error('Unauthorized action');
  }

  return await prisma.post.delete({
    where: { id: postId },
  });
}
