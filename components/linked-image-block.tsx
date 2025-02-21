import { createReactBlockSpec } from '@blocknote/react';
import Link from 'next/link';

export const LinkedImageBlock = createReactBlockSpec(
  {
    type: 'linkedImage',
    content: 'inline',
    propSchema: {
      url: {
        type: 'string',
        default: '',
      },
      caption: {
        type: 'string',
        default: '',
      },
      href: {
        type: 'string',
        default: '',
      },
    },
  },
  {
    render: ({ block }) => {
      return (
        <div className="flex w-full mx-auto max-w-[500px]">
          <Link
            href={block.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.props.url} alt={block.props.caption} />
            <p>{block.props.caption}</p>
          </Link>
        </div>
      );
    },
  },
);
