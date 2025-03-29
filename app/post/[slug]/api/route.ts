import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        tags: true,
        links: true,
        author: { select: { id: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const nextPost = await prisma.post.findFirst({
      where: {
        published: true,
        createdAt: { gt: post.createdAt },
      },
      select: {
        slug: true,
        title: true,
        tags: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const prevPost = await prisma.post.findFirst({
      where: {
        published: true,
        createdAt: { lt: post.createdAt },
      },
      select: {
        slug: true,
        title: true,
        tags: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const tagsData = await prisma.tag.findMany({
      take: 18,
      orderBy: { id: 'asc' },
    });

    const links = await prisma.link.findMany({
      where: { postId: post.id },
      orderBy: { createdAt: 'asc' },
      take: 3,
    });

    return NextResponse.json({
      post,
      prevPost,
      nextPost,
      tagsData,
      links,
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
