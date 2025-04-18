'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Link, Tag } from '@prisma/client';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function createPost() {
  const session = await auth();
  if (!session || session.user?.id === undefined)
    return { error: '로그인이 필요합니다.' };

  const userId = session.user.id;

  const existingPost = await prisma.post.findFirst({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      slug: true,
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (existingPost && !existingPost.slug && !existingPost.published) {
    return existingPost.id;
  }

  const newPost = await prisma.post.create({
    data: {
      author: {
        connect: { id: userId },
      },
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
  if (!session) return { error: '로그인이 필요합니다.' };

  try {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const contentString = formData.get('content') as string | null;
    const linksString = formData.get('links') as string | null;
    const tagsString = formData.get('tags') as string | null;
    const image = formData.get('image') as string | null;

    // check if slug is already used by a *different* post
    const existingPost = await prisma.post.findUnique({ where: { slug } });

    if (existingPost && existingPost.id !== id) {
      return { error: '이미 생성 된 포스트입니다.' };
    }

    let content;

    try {
      if (typeof contentString === 'string') {
        // If it's accidentally stringified as "[object Object]", it's invalid
        if (contentString.trim() === '[object Object]') {
          return { error: '컨텐츠를 수정해주세요.' };
        }

        content = JSON.parse(contentString);
      } else if (typeof contentString === 'object' && contentString !== null) {
        // If it’s already a valid object
        content = contentString;
      } else {
        return { error: '유효하지 않은 형식의 콘텐츠입니다.' };
      }
    } catch (err) {
      console.error('Failed to parse content:', err);
      return { error: '콘텐츠 파싱 중 문제가 발생했습니다.' };
    }

    if (!id || !title || !content || !slug) {
      return {
        error: '컨텐츠 형식이 잘못 되었습니다.',
      };
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true, links: true },
    });

    if (!post) {
      return { error: '포스트가 존재하지 않습니다.' };
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

    await prisma.link.createMany({ data: newLinks });

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
        ...(image ? { image } : {}),
        content,
        tags: {
          set: [],
          connectOrCreate: tagData,
        },
        published: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('🔥 Final catch block error:', error);
    return {
      error: '컨텐츠를 수정해주세요.',
    };
  }
}

export async function deletePost(slug: string) {
  const session = await auth();
  if (!session) return redirect('/');

  return await prisma.post.delete({
    where: { slug: slug },
  });
}

export async function deletePostById(id: string) {
  const session = await auth();
  if (!session) return redirect('/');

  return await prisma.post.delete({
    where: { id: id },
  });
}

export async function togglePublishPost(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return;

  await prisma.post.update({
    where: { slug },
    data: { published: !post.published },
  });

  revalidatePath('/my-posts'); // replace with actual page
}
