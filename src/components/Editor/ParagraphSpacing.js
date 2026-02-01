import { Extension } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

const ParagraphSpacing = Extension.create({
  name: "paragraphSpacing",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, view, schema } = editor;
        const { $from, empty } = state.selection;

        // فقط اگر در انتهای بلاک باشیم و انتخاب خالی باشه (یعنی یک نقطه)
        const isAtEnd = $from.parentOffset === $from.parent.content.size;

        if (!empty || !isAtEnd) {
          // اجازه بده رفتار پیش‌فرض اجرا بشه
          return false;
        }

        const paragraph = schema.nodes.paragraph.create(
          { style: "margin-top: 1em" },
          schema.text("\u200B")
        );

        let pos = $from.after();
        let tr = state.tr.insert(pos, paragraph);
        tr = tr.setSelection(TextSelection.create(tr.doc, pos + 1));

        view.dispatch(tr);
        return true;
      },

      "Shift-Enter": () => {
        // این اجازه میده که داخل پاراگراف بدون شکستن پاراگراف، فقط یک سطر جدید زده بشه
        return false;
      },
    };
  },
});

export default ParagraphSpacing;
