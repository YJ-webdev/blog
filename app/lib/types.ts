export type PostPreviewType = {
  slug: string | null;
  title: string | null;
  image: string | null;
  content: string | null;
  createdAt: Date;
  id?: string;
  tags?: string[];
  authorId?: string;
  bookmarkedBy?: boolean;
  myPosts?: boolean;
};
