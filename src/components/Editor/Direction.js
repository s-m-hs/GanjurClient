import { Extension } from "@tiptap/core";

export const Direction = Extension.create({
  name: "direction",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
    };
  },

  addGlobalAttributes() {
    return this.options.types.map((type) => ({
      types: [type],
      attributes: {
        direction: {
          default: null,
          parseHTML: (element) => {
            const dir = element.getAttribute("dir");
            const style = element.getAttribute("style");

            if (dir) {
              return dir;
            }

            // Parse inline style (e.g. style="direction: rtl")
            if (style && style.includes("direction")) {
              const match = style.match(/direction:\s*(rtl|ltr)/);
              if (match) {
                return match[1];
              }
            }

            return null;
          },
          renderHTML: (attributes) => {
            if (!attributes.direction) {
              return {};
            }

            return {
              style: `direction: ${attributes.direction}`,
            };
          },
        },
      },
    }));
  },
});

export default Direction;
