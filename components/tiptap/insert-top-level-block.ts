import { Editor } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state';
import { Node as ProseMirrorNode } from 'prosemirror-model';

export const insertTopLevelBlock = (
  editor: Editor,
  nodeType: string,
  attrs: Record<string, unknown> = {},
  content?: ProseMirrorNode | ProseMirrorNode[] | null,
) => {
  editor.commands.command(({ state, dispatch }) => {
    const { schema, selection } = state;
    const { $from } = selection;

    let insertPos = 0;
    for (let d = $from.depth; d > 0; d--) {
      if ($from.node(d).type === schema.nodes.doc) {
        insertPos = $from.after(d);
        break;
      }
    }

    if (!insertPos) {
      insertPos = $from.after(1) || 0;
    }

    const nodeTypeObj = schema.nodes[nodeType];
    if (!nodeTypeObj) return false;

    const node = nodeTypeObj.createAndFill(attrs, content);
    if (!node) return false;

    const tr = state.tr.insert(insertPos, node);

    if (dispatch) {
      const selection = TextSelection.near(tr.doc.resolve(insertPos + 1));
      tr.setSelection(selection);
      dispatch(tr);
    }

    editor.commands.focus();
    return true;
  });
};
