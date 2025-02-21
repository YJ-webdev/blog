import { useState } from 'react';
import { useBlockNoteEditor, useComponentsContext } from '@blocknote/react';
import { Link } from 'lucide-react';
import '@blocknote/mantine/style.css';

export function CreateLinkButton() {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;

  const [url, setUrl] = useState<string>('');

  const handleAddLink = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && url) {
      const block = editor.getTextCursorPosition().block;

      if (block.type === 'image') {
        const imageProps = block.props as { url?: string; caption?: string };

        if (!imageProps?.url) {
          console.error('Image URL not found.');
          return;
        }

        // Replace the image block with a new one that includes the href
        editor.replaceBlocks(
          [block],
          [
            {
              id: block.id,
              type: 'image',
              props: {
                url: imageProps.url,
                caption: imageProps.caption || '',
                href: url, // Store the link
              },
              content: undefined,
              children: [],
            },
          ],
        );
      }
    }
  };

  return (
    <Components.Generic.Popover.Root>
      <Components.Generic.Popover.Trigger>
        <Components.FormattingToolbar.Button
          className={'bn-button'}
          label={'Link'}
          mainTooltip={'Add Link'}
          icon={<Link size={16} />}
        />
      </Components.Generic.Popover.Trigger>
      <Components.Generic.Popover.Content
        className={'bn-popover-content bn-form-popover'}
        variant={'form-popover'}
      >
        <Components.Generic.Form.Root>
          <Components.Generic.Form.TextInput
            name={'image-link'}
            icon={<Link size={16} />}
            value={url || ''}
            autoFocus={true}
            placeholder={'Add URL'}
            onKeyDown={handleAddLink}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </Components.Generic.Form.Root>
      </Components.Generic.Popover.Content>
    </Components.Generic.Popover.Root>
  );
}
