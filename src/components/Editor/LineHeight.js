// extensions/LineHeight.js
import { Extension } from "@tiptap/core";

export const LineHeight = Extension.create({
  name: "lineHeight",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          lineHeight: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
            parseHTML: (element) => ({
              lineHeight: element.style.lineHeight || null,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight) =>
        ({ commands }) => {
          return commands.updateAttributes("paragraph", { lineHeight });
        },
    };
  },
});
