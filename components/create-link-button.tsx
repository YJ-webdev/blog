import { useState } from 'react';
import { useBlockNoteEditor, useComponentsContext } from '@blocknote/react';
import { Link } from 'lucide-react';
import '@blocknote/mantine/style.css';

export function CreateLinkButton() {
  const editor = useBlockNoteEditor();
  const Components = useComponentsContext()!;

  const [href, setHref] = useState<string>('');

  const handleAddLink = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && href) {
      const block = editor.getTextCursorPosition().block;

      if (block.type === 'image') {
        editor.replaceBlocks(
          [block],
          [
            {
              id: block.id,
              type: 'image',
              props: {
                url: block.props.url,
                caption: block.props.caption,
                previewWidth: block.props.previewWidth,
                textAlignment: 'center',
                name: href, // Add href properly
              },
              content: undefined,
              children: [],
            },
          ],
        );
        setTimeout(() => {
          console.log('Updated Image Block:', editor.getBlock(block.id));
        }, 500);
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
            value={href || ''}
            autoFocus={true}
            placeholder={'Add URL'}
            onKeyDown={handleAddLink}
            onChange={(e) => {
              setHref(e.target.value);
            }}
          />
        </Components.Generic.Form.Root>
      </Components.Generic.Popover.Content>
    </Components.Generic.Popover.Root>
  );
}
