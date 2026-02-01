import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageComponent from "./ResizableImageComponent"; // کامپوننت ری‌اکت که در مرحله ۲ می‌سازیم

const ResizableImage = Node.create({

  name: "resizableImage",

  group: "block",

  draggable: true,

  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: "100%" },
      alignment: { default: "center" }, // 👈 اضافه شد

    };
  },


  // خواندن HTML ذخیره‌شده
  parseHTML() {
    return [
      // حالت رندر ما: div.wrapper + img
      {
        tag: "div.image-node",
        getAttrs: (el) => {
          const img = el.querySelector("img[src]");
          if (!img) return false;
          const width = img.getAttribute("width") || img.style.width || "100%";
          const align = el.getAttribute("data-align") || "center";
          return {
            src: img.getAttribute("src") || null,
            alt: img.getAttribute("alt") || null,
            width: width !== "auto" ? width : "100%",
            alignment: ["left", "center", "right"].includes(align) ? align : "center",
          };
        },
      },
      // سازگاری با HTML قدیمی: img تنها
      {
        tag: "img[src]",
        getAttrs: (element) => {
          const width = element.getAttribute("width") || element.style.width || "100%";
          return {
            src: element.getAttribute("src") || null,
            alt: element.getAttribute("alt") || null,
            width: width !== "auto" ? width : "100%",
            alignment: "center",
          };
        },
      },
    ];
  },
  // خروجی HTML (برای ذخیره در دیتابیس)
  renderHTML({ HTMLAttributes }) {
    const attrs = { ...HTMLAttributes };
    const { src, alt, width, alignment } = attrs;

    // استایل والد برای ترازبندی
    const wrapStyle =
      alignment === "left"
        ? "display:flex; justify-content:flex-start;"
        : alignment === "right"
          ? "display:flex; justify-content:flex-end;"
          : "display:flex; justify-content:center;";

    // استایل خود تصویر
    const imgAttrs = {
      src,
      alt,
      style: `width: ${width || "100%"}; height: auto;`,
      class: "resizable-img",
    };

    return [
      "div",
      { class: "image-node", "data-align": alignment, style: wrapStyle },
      ["img", mergeAttributes(imgAttrs)],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
  addCommands() {
    return {
      setImageAlignment:
        (alignment) =>
          ({ commands }) =>
            commands.updateAttributes(this.name, { alignment }),
    };
  },
});

export default ResizableImage;
