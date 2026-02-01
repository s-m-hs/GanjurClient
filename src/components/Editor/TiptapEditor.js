import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import EmojiPicker from "emoji-picker-react"; // Import the emoji picker
import "./tiptapfont.css";
import TableGridSelector from "./TableGridSelector";
import TableInsertButton from "./TableInsertButton";
import apiUrl from "../../utils/ApiConfig";
import ResizableImage from "./ResizableImage";
import CustomTable from "./CustomTable"; // Import the custom table extension
import { LineHeight } from "./LineHeight";
import LineHeightSelect from "./LineHeightSelect";
import ParagraphSpacing from "./ParagraphSpacing";
import { Extension } from "@tiptap/core"; // Import Extension
import Link from "@tiptap/extension-link"; // Import the Link extension
import Direction from "./Direction";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ImageSquare } from "@phosphor-icons/react";
// افزودن ویژگی‌های سفارشی به TextStyle
// No changes needed for $PLACEHOLDER$ in this case as it pertains to extensions.
// The style changes will be applied in the toolbar section below.
const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily || null,
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) return {};
          return { style: `font-family: ${attributes.fontFamily}` };
        },


      },
    };
  },
});

// Custom extension to preserve multiple spaces
const PreserveMultipleSpaces = Extension.create({
  name: "preserveMultipleSpaces",

  addKeyboardShortcuts() {
    return {
      " ": ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $cursor } = selection;

        // Only handle if there is a cursor (not a selection)
        if (!$cursor) {
          return false;
        }

        const { pos } = $cursor;
        // Get the character immediately before the cursor
        const charBefore = state.doc.textBetween(pos - 1, pos);

        // If the character before the cursor is a space, insert a non-breaking space character.
        // The 'white-space: pre-wrap;' CSS should ensure this space is preserved.
        if (charBefore === " ") {
          editor.commands.insertContent("\u00A0"); // <-- Changed to insert non-breaking space character
          return true; // Prevent default space insertion
        }

        // Otherwise, let the default space insertion happen
        return false;
      },
    };
  },
});

const TiptapEditor = ({ value, onChange, onTextChange, height = "300px", active = true }) => {
  const fileInputRef = useRef();
  const [fontSize, setFontSize] = useState("16px");
  const [plainText, setPlainText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [dir, setDir] = useState("");
  const fonts = [
    { label: "Yekan", value: "Yekan" },
    { label: "Vazir", value: "vazir" },
    { label: "BMitra", value: "BMitra" },
    { label: "BTITRBD", value: "BTITRBD" },
    { label: "BNazanin", value: "BNazanin" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
  ];
  const editor = useEditor({
    extensions: [
      StarterKit,
      PreserveMultipleSpaces, // Add the new extension here
      CustomTable.configure({
        paragraph: false,
        resizable: true,
      }),
      Direction.configure({
        types: ["paragraph", "heading"], // customize if needed
      }),
      TableRow,
      TableCell,
      TableHeader,
      LineHeight,
      ParagraphSpacing,
      // Image.configure({  //با فعال بودن این قسمت عرض عکسها فقط در حالت پیشفرض باقی میمانند
      //   inline: false,
      //   allowBase64: false,
      // }),
      ResizableImage,
      Underline,
      CustomTextStyle,
      Color,
      Highlight,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        // Configure the Link extension
        openOnClick: false, // Prevent opening link on click in editor
        autolink: true, // Automatically create links from URLs
        linkOnPaste: true, // Create links on paste
      }),
    ],

    content: value || "<p></p>",
    onUpdate({ editor }) {
      // تبدیل تمام تصاویر به resizableImage قبل از ذخیره
      const doc = editor.state.doc;
      let content = doc.content;
      // پیدا کردن تمام تصاویر و تبدیل آنها
      doc.descendants((node, pos) => {
        if (node.type.name === "image") {
          editor.commands.setNodeSelection(pos);
          editor.commands.setNode("resizableImage", {
            src: node.attrs.src,
            alt: node.attrs.alt,
            width: node.attrs.width || "auto",
          });
        }
      })
      const updatedHTML = `<div style="padding: 1rem;">${editor.getHTML()}</div>`;
      onChange(updatedHTML);
      onTextChange?.(editor.getText());
    },

    onCreate({ editor }) {
      editor.commands.setMark("textStyle", { fontSize: "16px" });
      editor.commands.setTextAlign("justify");
      editor.commands.setContent(value || "<p></p>");
      editor.chain().focus().setLineHeight("2").run();
      // editor.chain().focus().setColor("#ffff").run();
    },
  });
  const setLineHeight = (height) => {
    editor.chain().focus().setLineHeight(height).run();
  };

  const toggleDirection = () => {
    const newDir = dir === "ltr" ? "rtl" : "ltr";
    if (dir === "ltr") {
      ///این شرط جهت را در تگ , به صورت استایل اینلایم وارد میکند
      editor.commands.updateAttributes("paragraph", { direction: "rtl" });
    } else {
      editor.commands.updateAttributes("paragraph", { direction: "ltr" });
    }
    setDir(newDir);
  };
  useEffect(() => {
    if (!editor) return;

    // تبدیل تصاویر موجود به resizableImage هنگام لود اولیه
    editor.commands.command(({ tr }) => {
      tr.doc.descendants((node, pos) => {
        if (node.type.name === "image") {
          tr.setNodeMarkup(pos, editor.schema.nodes.resizableImage, {
            src: node.attrs.src,
            alt: node.attrs.alt,
            width: node.attrs.width || "auto",
            alignment: node.attrs.alignment || "center",
          });
        }
      });
      return true;
    });

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [editor, value]);
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [editor, value]);


  const handleFontChange = (e) => {
    const font = e.target.value;
    editor?.chain().focus().setMark("textStyle", { fontFamily: font }).run();
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    setFontSize(size);

    if (!editor) return;

    const hasSelection = !editor.state.selection.empty;
    editor.chain().focus();

    if (hasSelection) {
      editor.chain().setMark("textStyle", { fontSize: size }).run();
    } else {
      editor.commands.setMark("textStyle", { fontSize: size });
    }
  };

  const insertEmoji = (emojiObject) => {
    editor.chain().focus().insertContent(emojiObject.emoji).run();
    setShowEmojiPicker(false); // Close the emoji picker after inserting
  };

  // Function to handle link insertion
  const setLink = () => {
    if (!editor) {
      console.log("Editor instance not available.");
      return;
    }


    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      console.log("Link prompt cancelled.");
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().setLink({ href: url }).run();
  };


  useEffect(() => {
    if (!editor) return;

    // فقط اگر محتوا تغییر کرده باشد، آن را بارگذاری کن
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", false, { preserveWhitespace: true });
      // editor.commands.setColor("#ffffff"); // اعمال رنگ سفید به محتوای بارگذاری‌شده
    }

    // بررسی جهت‌گیری (direction)
    const container = document.createElement("div");
    container.innerHTML = value || "";
    const blockWithDir = container.querySelector('[style*="direction"]');

    if (blockWithDir) {
      const style = blockWithDir.getAttribute("style");
      const match = style?.match(/direction:\s*(rtl|ltr)/);
      if (match && match[1]) {
        const detectedDir = match[1];
        setDir(detectedDir);
        editor.options.element.setAttribute("dir", detectedDir);
      }
    }
  }, [editor, value]);
  // ✅ Only return after all hooks
  if (!active || !editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="toolbar">




        <button type="button" onClick={toggleDirection}>{dir === "ltr" ? <i class="fa-solid fa-indent"></i> : <i class="fa-solid fa-indent fa-rotate-180"></i>}</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "active" : ""} title="Bold">
          <i className="fas fa-bold"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "active" : ""} title="Italic">
          <i className="fas fa-italic"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "active" : ""} title="Underline">
          <i className="fas fa-underline"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align Right">
          <i className="fas fa-align-right"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align Center">
          <i className="fas fa-align-center"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align Left">
          <i className="fas fa-align-left"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()} title="Justify">
          <i className="fas fa-align-justify"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "active" : ""} title="Bullet List">
          <i className="fas fa-list-ul"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "active" : ""} title="Ordered List">
          <i className="fas fa-list-ol"></i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
          title="Heading 1"
        >
          <i className="fas fa-heading"></i> 1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          title="Heading 2"
        >
          <i className="fas fa-heading"></i> 2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
          title="Heading 3"
        >
          <i className="fas fa-heading"></i> 3
        </button>
        <TableInsertButton
          editor={editor}
          onInsert={({ rows, cols }) => {
            editor
              ?.chain()
              .focus()
              .insertTable({ rows, cols, withHeaderRow: true })
              // .setCellAttribute("table", {
              //   class: "table table-borderless", // Add the class here
              //   style: "width: 100%; table-layout: fixed; border-collapse: collapse;",
              // })
              .run();
          }}
        />
        <button type="button" onClick={() => editor.chain().focus().deleteTable().run()}>
          <i class="fa-solid fa-minus"></i>
          <i class="fa-solid fa-border-all "></i>{" "}
        </button>
        <button type="button" onClick={() => editor.chain().focus().addColumnBefore().run()}>
          ||<i class="fa-solid fa-plus"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>
          <i class="fa-solid fa-plus"></i>||{" "}
        </button>
        <button type="button" onClick={() => editor.chain().focus().addRowBefore().run()}>
          =<i class="fa-solid fa-plus"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>
          <i class="fa-solid fa-plus"></i>={" "}
        </button>
        <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()}>
          <i class="fa-solid fa-minus"></i>||{" "}
        </button>
        <button type="button" onClick={() => editor.chain().focus().deleteRow().run()}>
          <i class="fa-solid fa-minus"></i>={" "}
        </button>

        {/* <button
          type="button"
          onClick={() => {
            const dom = document.querySelector(".ProseMirror table");
            if (dom) dom.classList.toggle("table-striped");
          }}
        >
          📝
        </button> */}

        <button type="button" onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <i className="fas fa-undo"></i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <i className="fas fa-redo"></i>
        </button>
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Insert Emoji">
          <i className="fas fa-smile"></i>
        </button>
        <input type="color" onInput={(e) => editor.chain().focus().setColor(e.target.value).run()} title="رنگ متن" />
        {/* <input
          type="color"
          onInput={(e) =>
            editor.chain().focus().setHighlight({ color: e.target.value }).run()
          }
          title="رنگ پس‌زمینه"
        /> */}
        <select onChange={(e) => editor.chain().focus().setMark("textStyle", { fontFamily: e.target.value }).run()} title="Font Family">
          <option value="">Default</option>
          {fonts.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
        <LineHeightSelect editor={editor} />

        <select onChange={handleFontSizeChange} value={fontSize} title="اندازه فونت">
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="34px">34px</option>
          <option value="42px">42px</option>
          <option value="48px">48px</option>
          <option value="72px">72px</option>
        </select>
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          {/* <UploadFileIcon /> */}
          <ImageSquare size={30} />
        </button>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("File", file);

            const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
              method: "POST",
              body: formData,
            });

            const text = await res.text();
            let result;
            try {
              result = JSON.parse(text);
            } catch {
              alert("پاسخ سرور نامعتبر است");
              return;
            }

            const imageUrl = `${apiUrl}/${result.adress}`;
            const altText = window.prompt("توضیح (alt) برای تصویر را وارد کنید:", "");
            editor
              ?.chain()
              .focus()
              .insertContent({
                type: "resizableImage",
                // attrs: { src: imageUrl, width: "100%", alt: `تصویر${imageUrl?.slice(-15)}` },
                attrs: {
                  src: imageUrl, width: "100%", alignment: "center",
                  alt: altText || `تصویر${imageUrl?.slice(-15)}`
                },

              })
              .run();
          }}
        />


        {/* Emoji Picker Button */}

        {/* Emoji Picker Dropdown */}
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={insertEmoji} />
          </div>
        )}

        {/* Link Button */}
        <button type="button" onClick={setLink} className={editor.isActive("link") ? "is-active" : ""} title="Insert Link">
          <i className="fas fa-link"></i>
        </button>
      </div>

      {/* <TableGridSelector
        onSelect={(rows, cols) => {
          editor
            .chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: true })
            .run();
        }}
      /> */}
      <div className="editor-wrapper" dir={dir}>
        <EditorContent editor={editor} style={{ minHeight: height }} />
      </div>
    </div>
  );
};

export default TiptapEditor;
