import { PostPreviewType } from '../lib/types';
import PostPreviewCard from './post-preview-card';

export const PostPreviewMain = ({
  slug,
  title,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  return (
    <div className="col-span-1 md:col-span-2 mb-5">
      <PostPreviewCard
        slug={slug}
        title={title}
        image={image}
        content={content}
        createdAt={createdAt}
      />
    </div>
  );
};
