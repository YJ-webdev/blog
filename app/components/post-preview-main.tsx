import { PostPreviewType } from '../lib/types';
import PostPreviewCard from './post-preview-card';

export const PostPreviewMain = ({
  id,
  title,
  image,
  content,
  publishedAt,
}: PostPreviewType) => {
  return (
    <div className="col-span-1 md:col-span-2 mb-5">
      <PostPreviewCard
        id={id}
        title={title}
        image={image}
        content={content}
        publishedAt={publishedAt}
      />
    </div>
  );
};
