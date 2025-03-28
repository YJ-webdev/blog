import { Tag } from '@prisma/client';

export type SidebarPostType = {
  slug: string | null;
  title: string | null;
  createdAt: Date;
};

export type PostPreviewType = SidebarPostType & {
  image: string | null;
  content: string | null;
  tags?: Tag[];
  authorId?: string;
  bookmarkedBy?: boolean;
  myPosts?: boolean;
};

export type PrevPostType = {
  id: string;
  slug: string | null;
  title: string | null;
  published: boolean;
};
