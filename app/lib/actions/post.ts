'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import { Link, Post, Tag } from '@prisma/client';

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

export const getPostBySlug = async (
  slug: string,
): Promise<(Post & { tags: Tag[] }) | null> => {
  const decodedSlug = decodeURIComponent(slug);
  const post = await prisma.post.findUnique({
    where: { slug: decodedSlug },
    include: {
      tags: true,
    },
  });
  return post;
};

export const getPostByUserId = async (userId: string) => {
  const post = await prisma.post.findMany({
    where: {
      authorId: userId,
      published: true,
    },
    select: {
      slug: true,
      title: true,
      content: true,
      image: true,
      tags: true,
      links: true,
      bookmarkedBy: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return post;
};

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  try {
    console.log('Searching for posts with tag:', tag); // Debugging the tag
    const decodedTag = decodeURIComponent(tag);

    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: decodedTag,
          },
        },
        published: true,
      },
    });

    console.log(`Found ${posts.length} posts with tag: ${tag}`); // Debugging the result

    return posts;
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    throw new Error(
      'Unable to fetch posts at this time. Please try again later.',
    );
  }
};

export async function createPost() {
  const user = await currentUser();
  if (!user) return redirect('/login');

  // slug should be uniquely generate automatinally.
  const unpublishedPost = await prisma.post.findFirst({
    where: {
      authorId: user.id,
      published: false,
    },
  });

  if (unpublishedPost) {
    return unpublishedPost;
  }

  const newPost = await prisma.post.create({
    data: {
      authorId: user.id,
      slug: user.id,
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
    return console.log('User is not authorized to edit this post');
  }

  const links: Link[] = linksString ? JSON.parse(linksString) : [];

  if (links.length > 0) {
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

  if (links.length > 0 && post.links.length + links.length > 3) {
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
