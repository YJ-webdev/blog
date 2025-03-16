'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';

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

export async function publishPost(postId: string) {
  const user = await currentUser();
  if (!user) return redirect('/login');

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== user.id) {
    throw new Error('Unauthorized action');
  }

  return await prisma.post.update({
    where: { id: postId },
    data: { published: true },
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
