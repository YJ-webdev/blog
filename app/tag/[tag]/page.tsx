import { PostPreviewType } from '../../lib/types';
import { getPostsByTag } from '../../lib/actions/post';
import { PostPreviewMain } from '../../components/post-preview-main';
import { extractText } from '../../lib/utils';
import PostPreviewCard from '../../components/post-preview-card';

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (!posts || posts.length === 0)
    return (
      <div className="max-w-[750px] mx-auto flex flex-col gap-5">
        No posts found
      </div>
    );

  const [mainPost, ...otherPosts] = posts;

  const processedFirstPostContent = posts[0].content
    ? extractText(posts[0].content)
    : '';

  return (
    <div className="flex flex-col gap-7 mt-5 w-full">
      <PostPreviewMain
        slug={mainPost.slug ?? ''}
        title={mainPost.title!}
        content={processedFirstPostContent}
        image={mainPost.image!}
        createdAt={mainPost.createdAt!}
      />
      <div className="grid grid-cols-1 mt-3 gap-10 sm:grid-cols-2 mb-20">
        {otherPosts.map((post: PostPreviewType) => {
          const processedContent = post.content
            ? extractText(post.content)
            : '';

          return (
            <PostPreviewCard
              key={post.slug}
              slug={post.slug ?? ''}
              title={post.title!}
              content={processedContent} // Pass extracted content
              image={post.image!}
              createdAt={post.createdAt!}
            />
          );
        })}
      </div>
    </div>
  );
}
