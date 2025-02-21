import { createReactBlockSpec } from '@blocknote/react';

export const LinkedImageBlock = createReactBlockSpec(
  {
    type: 'linkedImage',
    content: 'none',
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
    render: (props: any) => {
      // Access the data properties correctly
      const { url, caption, href } = props.data as {
        url: string;
        caption: string;
        href: string;
      };

      return (
        <div>
          <a href={href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={caption} />
            <p>{caption}</p>
          </a>
        </div>
      );
    },
  },
);
