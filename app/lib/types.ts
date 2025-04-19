import { Tag } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export type SidebarPostType = {
  slug: string | null;
  title: string | null;
  createdAt: Date;
};

type tagname = {
  name: string;
};

export type PostPreviewType = SidebarPostType & {
  image?: string | null;
  content: JsonValue;
  tags?: tagname[];
  authorId?: string;
  bookmarkedBy?: boolean;
  myPosts?: boolean;
};

export type PrevPostType = {
  slug: string | null;
  title: string | null;
  tags: Tag[];
};
