'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Link, Tag } from '@prisma/client';
import { auth } from '@/auth';

export async function createPost() {
  const session = await auth();
  if (!session?.user) throw new Error('User not authenticated');

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
      authorId: session.user.id as string,
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
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  try {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const image = formData.get('image') as string;
    const content = formData.get('content') as string;
    const linksString = formData.get('links') as string | null;
    const tagsString = formData.get('tags') as string | null;

    if (!id || !title || !content || !slug || !image) {
      return { error: 'Required fields are missing' };
    }

    if (image.length > 1024 * 1024 * 2) {
      return { error: '파일의 크키가 2MB를 초과했습니다.' };
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true, links: true },
    });

    if (!post || post.authorId !== session.user.id) {
      return { error: '이 포스트를 편집할 권한이 없거나 포스트가 없습니다.' };
    }

    const links: Link[] = linksString ? JSON.parse(linksString) : [];

    const newLinks = links.map((link) => ({
      url: link.url,
      title: link.title,
      description: link.description,
      image: link.image,
      siteName: link.siteName,
      favicon: link.favicon,
      postId: id,
    }));

    // Check if there are duplicated links by checking their URL and only add non-duplicated links

    await prisma.link.createMany({ data: newLinks });

    // Check if there are more than 3 links and delete the old ones, so only 3 links are kept
    if (post.links.length + newLinks.length > 3) {
      const excessLinksCount = post.links.length + newLinks.length - 3;

      const linksToDelete = await prisma.link.findMany({
        where: { postId: id },
        orderBy: { createdAt: 'asc' },
        take: excessLinksCount,
      });

      const linkIdsToDelete = linksToDelete.map((link) => link.id);

      await prisma.link.deleteMany({
        where: {
          id: { in: linkIdsToDelete },
        },
      });
    }

    let tags: { name: string }[] = [];

    if (tagsString) {
      try {
        tags = JSON.parse(tagsString).map((tag: Tag) => ({ name: tag.name }));
      } catch {
        return { error: '입력하신 태그를 읽을 수 없습니다.' };
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
    return {
      error: '파일 형식이 잘못 되었습니다. 이미지 파일이 맞는지 확인해주세요.',
    };
  }
}

export async function deletePost(slug: string) {
  const session = await auth();
  if (!session?.user) return redirect('/login');

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post || post.authorId !== session.user.id) {
    throw new Error('Unauthorized action');
  }

  return await prisma.post.delete({
    where: { slug: slug },
  });
}
