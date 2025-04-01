'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Link, Tag } from '@prisma/client';
import { auth } from '@/auth';

const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export async function createPost() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error('User not authenticated');

  const userId = session.user.id;
  const user = session.user;
  const existingPost = await prisma.post.findFirst({
    where: {
      authorId: user.id,
      published: false,
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (existingPost) {
    return existingPost.id;
  }
  const newPost = await prisma.post.create({
    data: {
      authorId: userId,
      published: false,
    },
    select: {
      id: true,
    },
  });
  return newPost.id;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function publishPost(prevstate: any, formData: FormData) {
  try {
    const user = await currentUser(); // Get the current user

    if (!user) throw new Error('User not authenticated'); // Check if the user is authenticated

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const image = formData.get('image') as string;
    const content = formData.get('content') as string;
    const linksString = formData.get('links') as string | null;
    const tagsString = formData.get('tags') as string | null;

    if (!id || !title || !content || !slug || !image) {
      throw new Error('Required fields are missing');
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true, links: true },
    });

    if (!post || post.authorId !== user.id) {
      return { error: 'User is not authorized to edit this post' };
    }

    const links: Link[] = linksString ? JSON.parse(linksString) : [];

    if (links.length > 0) {
      const existingLinks = await prisma.link.findMany({
        where: { postId: id },
        select: { id: true, url: true },
      });

      const existingLinksMap = new Map(
        existingLinks.map((link) => [link.url, link.id]),
      );

      const newLinks = [];
      const linksToDelete = [];

      for (const link of links) {
        if (existingLinksMap.has(link.url)) {
          const oldLinkId = existingLinksMap.get(link.url);
          if (oldLinkId) {
            linksToDelete.push(oldLinkId);
          }
        }
        newLinks.push({
          url: link.url,
          title: link.title,
          description: link.description,
          image: link.image,
          siteName: link.siteName,
          favicon: link.favicon,
          postId: id,
        });
      }

      if (linksToDelete.length > 0) {
        await prisma.link.deleteMany({
          where: { id: { in: linksToDelete } },
        });
      }

      if (newLinks.length > 0) {
        await prisma.link.createMany({ data: newLinks });
      }
    }

    if (post.links.length + links.length > 3) {
      const deductingAmount = post.links.length + links.length - 3;

      const oldLinks = await prisma.link.findMany({
        where: { postId: id },
        orderBy: { createdAt: 'asc' },
        take: deductingAmount,
        select: { id: true },
      });

      await prisma.link.deleteMany({
        where: {
          id: { in: oldLinks.map((link) => link.id) },
        },
      });
    }

    let tags: { name: string }[] = [];

    if (tagsString) {
      try {
        tags = JSON.parse(tagsString).map((tag: Tag) => ({ name: tag.name }));
      } catch (error) {
        console.error('Invalid tags JSON format:', error);
        throw new Error('Invalid tags format');
      }
    }

    const tagData = tags.map((tag) => ({
      where: { name: tag.name },
      create: { name: tag.name },
    }));

    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        image: image ?? undefined,
        content,
        tags: {
          set: [],
          connectOrCreate: tagData,
        },
        published: true,
      },
    });

    return { success: true };
  } catch {
    console.error('Error publishing post');
    return { error: 'An unexpected error occurred' };
  }
}

export async function deletePost(slug: string) {
  const user = await currentUser();
  if (!user) return redirect('/login');

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post || post.authorId !== user.id) {
    throw new Error('Unauthorized action');
  }

  return await prisma.post.delete({
    where: { slug: slug },
  });
}
