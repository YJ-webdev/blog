'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import { Link } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getLinksbyPostId(postId: string) {
  const links = await prisma.link.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });
  return links;
}

export async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      image: true,
      authorId: true,
      tags: true,
      createdAt: true,
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

export const getPostBySlug = async (slug: string) => {
  const decodedSlug = decodeURIComponent(slug);
  const post = await prisma.post.findUnique({
    where: { slug: decodedSlug },
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
      slug: 'new-post',
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
      slug: 'new-post',
      published: false,
    },
  });

  return newPost; // Return the new post
}

export async function publishPost(formData: FormData): Promise<void> {
  const user = await currentUser();
  if (!user) throw new Error('User not authenticated');

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string | null;
  const content = formData.get('content') as string;
  const linksString = formData.get('links') as string | null;

  if (!id || !title || !content || !slug) {
    throw new Error('Required fields are missing');
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true, links: true },
  });

  if (!post || post.authorId !== user.id) {
    return console.log('User is not authorized to edit this post');
  }

  const links: Link[] = linksString ? JSON.parse(linksString) : [];

  if (links.length > 0) {
    await prisma.link.deleteMany({
      where: { postId: id },
    });

    const linkData = links.map((link) => ({
      url: link.url,
      title: link.title,
      description: link.description,
      image: link.image,
      siteName: link.siteName,
      favicon: link.favicon,
      postId: id,
    }));

    await prisma.link.createMany({
      data: linkData,
    });
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      image: image ?? undefined,
      content,
      published: true,
    },
  });
  revalidatePath('/post/new-post');
  redirect('/');
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
