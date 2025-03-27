import { PostTag } from '@prisma/client';

export type PostPreviewType = {
  slug: string | null;
  title: string | null;
  image: string | null;
  content: string | null;
  createdAt: Date;
  id?: string;
  tags?: PostTag[];
  authorId?: string;
  bookmarkedBy?: boolean;
  myPosts?: boolean;
};
