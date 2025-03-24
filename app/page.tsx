import { PostPreviewMain } from './components/post-preview-main';

import { getPosts } from './lib/actions/post';
import PostPreviewCard from './components/post-preview-card';
import { extractText } from './lib/utils';

export default async function Home() {
  const posts = await getPosts();

  if (!posts || posts.length === 0) return null;

  const [mainPost, ...otherPosts] = posts;

  const processedFirstPostContent = posts[0].content
    ? extractText(posts[0].content)
    : '';

  return (
    <div className="grid grid-cols-1 gap-7 mt-6 md:grid-cols-2 mb-20">
      <PostPreviewMain
        slug={mainPost.slug ?? ''}
        title={mainPost.title!}
        content={processedFirstPostContent}
        image={mainPost.image!}
        publishedAt={mainPost.createdAt}
      />

      {otherPosts.map((post) => {
        const processedContent = post.content ? extractText(post.content) : '';

        return (
          <PostPreviewCard
            key={post.slug}
            slug={post.slug ?? ''}
            title={post.title!}
            content={processedContent} // Pass extracted content
            image={post.image!}
            publishedAt={post.createdAt}
          />
        );
      })}
    </div>
  );
}
