// src/components/ParagraphContent/ParagraphContent.jsx
import React, { useContext, useEffect, useState } from "react";
import "./ParagraphContent.css";
import { CmsContext, EdiContext } from "../../context/CmsContext";

const ParagraphContent = ({
  item,
  itemIdx,
  paraIdx,
  rowIdx,
  paragraphs,
  activeParagraph,
  activeRow,
  activeElement,
  setActiveParagraph,
  setActiveRow,
  setActiveElement,
  setIsImageSelected,
  setActivePopup,
  handleTextResize,
  setImageSettings,
  setParagraphs,
  isViewMode = false
}) => {
    let{setIsolaSave}=useContext(CmsContext)
    let {setToggleHText,toggleHText}=useContext(EdiContext)


  

  const handleTextChange = (e, paraIdx, itemIdx, rowIdx) => {
    if (isViewMode) return;
    
    const newContent = e.target.value;
    if (rowIdx !== null) {
      setParagraphs((prev) =>
        prev.map((para, pIdx) =>
          pIdx === paraIdx
            ? {
                ...para,
                elements: para.elements.map((el, eIdx) =>
                  eIdx === rowIdx
                    ? {
                        ...el,
                        elements: el.elements.map((contentItem, idx) =>
                          idx === itemIdx
                            ? {
                                ...contentItem,
                                content: newContent,
                              }
                            : contentItem
                        ),
                      }
                    : el
                ),
              }
            : para
        )
      );
    } else {
      setParagraphs((prev) =>
        prev.map((para, pIdx) =>
          pIdx === paraIdx
            ? {
                ...para,
                elements: para.elements.map((contentItem, idx) =>
                  idx === itemIdx
                    ? { ...contentItem, content: newContent }
                    : contentItem
                ),
              }
            : para
        )
      );
    }
  };

  if (item.type === "text" || item.type === "h1") {
    const Element = isViewMode
    ? item.type === "h1"
      ? "h1"
      : "div"
    : "textarea";
    return (
      <Element
        key={itemIdx}
        className={`text-element ${
          !isViewMode && activeParagraph === paraIdx &&
          activeRow === rowIdx &&
          activeElement === itemIdx
            ? "active-text"
            : ""
        } ${isViewMode ? 'view-mode' : ''}`}
        style={{
          margin: item.style.margin || "0px",
          textAlign: item.style.textAlign || "right",
          direction: item.style.direction || "rtl",
          color: item.style.color || "#000",
          // fontSize: item.style.fontSize
          //   ? `${item.style.fontSize}px`
          //   : "14px",
          // fontWeight: item.style.fontWeight || "normal",
          fontSize:
          //  item.type === "h1" ? "24px" :
          // item.type === "h2" ? "20px" :
          // item.type === "h3" ? "10px"  :
          
           item.style.fontSize ? `${item.style.fontSize}px` : "14px",
          fontWeight: item.type === "h1" ? "bold" : item.style.fontWeight || "normal",
          width: `${item.style.width}px`,
          height: isViewMode ? "auto" : `${item.style.height}px`,
          maxWidth: item.style.maxWidth || "100%",
          padding: isViewMode ? "0" : (item.style.padding || "10px"),
          border: isViewMode ? "none" : "1px solid #ccc",
          borderRadius: isViewMode ? "0" : "4px",
          boxSizing: "border-box",
          resize: isViewMode ? "none" : "both",
          overflow: isViewMode ? "visible" : "auto",
          cursor: isViewMode ? "default" : "text",
          backgroundColor: isViewMode 
            ? "transparent"
            : (activeParagraph === paraIdx &&
               activeRow === rowIdx &&
               activeElement === itemIdx
                ? "#e6f7ff"
                : "#fff"),
          whiteSpace: isViewMode ? "pre-wrap" : "normal"
        }}
        value={item.content}
        onChange={(e) => handleTextChange(e, paraIdx, itemIdx, rowIdx)}
        onMouseUp={(e) => {
          if (!isViewMode) {
            const newWidth = e.target.offsetWidth;
            const newHeight = e.target.offsetHeight;
            handleTextResize(paraIdx, itemIdx, newWidth, newHeight, rowIdx);
          }
        }}
        onClick={(e) => {
          if (!isViewMode) {
            e.stopPropagation();
            setActiveParagraph(paraIdx);
            setActiveRow(rowIdx);
            setActiveElement(itemIdx);
            setIsImageSelected(false);
            setActivePopup(null);
          }
        }}
        
      >
        {isViewMode ? item.content : undefined}
      </Element>
    );
  }
  // if (item.type.startsWith("h")) {
  //   const HeadingTag = item.type; // مقدار می‌تواند h1, h2, h3, h4, h5 باشد
  //   return (
  //     <HeadingTag
  //       key={itemIdx}
  //       style={{
  //         color: item.style.color || "#000",
  //         textAlign: item.style.textAlign || "right",
  //         direction: item.style.direction || "rtl",
  //         margin: item.style.margin || "0px",
  //         fontWeight: item.style.fontWeight || "bold",
  //       }}
  //     >
  //       {item.content}
  //     </HeadingTag>
  //   );
  // }
  if (item.type.startsWith("h")) {
    const HeadingTag = item.type; // مقدار می‌تواند h1, h2, h3, h4, h5 باشد
    
    return isViewMode ? (
      <HeadingTag
        key={itemIdx}
        style={{
          color: item.style.color || "#000",
          textAlign: item.style.textAlign || "right",
          direction: item.style.direction || "rtl",
          margin: item.style.margin || "0px",
          fontWeight: item.style.fontWeight || "bold",
        }}
      >
        {item.content}
      </HeadingTag>
    ) : (
      <textarea
        key={itemIdx}
        className="heading-textarea"
        style={{
          color: item.style.color || "#000",
          textAlign: item.style.textAlign || "right",
          direction: item.style.direction || "rtl",
          fontSize: item.style.fontSize ? `${item.style.fontSize}px` : "20px",
          fontWeight: item.style.fontWeight || "bold",
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          resize: "none",
          outline: "none",
        }}
        value={item.content}
        onChange={(e) => handleTextChange(e, paraIdx, itemIdx, rowIdx)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveParagraph(paraIdx);
          setActiveRow(rowIdx);
          setActiveElement(itemIdx);
          setIsImageSelected(false);
          setActivePopup(null);
        }}
      />
    );
  }
  
  if (item.type === "image") {
    return (

      <div
        key={itemIdx}
        className={`image-element ${
          !isViewMode && activeParagraph === paraIdx &&
          activeRow === rowIdx &&
          activeElement === itemIdx
            ? "active-image"
            : ""
        } ${isViewMode ? 'view-mode' : ''}`}
        style={{
          margin: item.style.margin || "0px",
          cursor: isViewMode ? "default" : "pointer",
          border: isViewMode 
            ? "none"
            : (activeParagraph === paraIdx &&
               activeRow === rowIdx &&
               activeElement === itemIdx
                ? "2px solid blue"
                : "1px solid #ccc"),
          padding: isViewMode ? "0" : "5px",
          borderRadius: item.style.borderRadius ? `${item.style.borderRadius}px` : "4px",
          alignSelf: "flex-start",
          position: "relative",
        }}
        onClick={(e) => {
          if (!isViewMode) {
            e.stopPropagation();
            setActiveParagraph(paraIdx);
            setActiveRow(rowIdx);
            setActiveElement(itemIdx);
            setIsImageSelected(true);
            setImageSettings({
              width: item.style.width,
              height: item.style.height,
              borderRadius: item.style.borderRadius,
            });
            setActivePopup(null);
          }
        }}
      >
        <img
          src={item.src}
          alt={item.alt}
          // alt="تصویر"
          style={{
            width: `${item.style.width}px`,
            height: `${item.style.height}px`,
            objectFit: "cover",
            display: "block",
            borderRadius: `${item.style.borderRadius}px`,
          }}
        />
      </div>
    );
  }

  if (item.type === "row") {
    const flexDirection = item.style.flexDirection || "row";
    const justifyContent =
      flexDirection === "row"
        ? item.style.justifyContent || "flex-start"
        : "flex-start";
    const alignItems =
      flexDirection === "row"
        ? item.style.alignItems || "flex-start"
        : "flex-start";

    return (
      <>
          <div
        key={itemIdx}
        className={`row-element ${
          !isViewMode && activeParagraph === paraIdx && activeRow === itemIdx
            ? "active-row"
            : ""
        } ${isViewMode ? 'view-mode' : ''}`}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: flexDirection,
          flexWrap: item.style.flexWrap,
          gap: `${item.style.gap || 20}px`, // Default gap increased to 20px
          marginBottom: `${item.style.marginBottom || 20}px`,
          border: isViewMode
            ? "none"
            : (activeParagraph === paraIdx && activeRow === itemIdx
                ? "2px solid #3c3b39"
                : item.style.border || "1px solid #dddddd"),
          padding: isViewMode ? "0" : "10px",
          cursor: isViewMode ? "default" : "pointer",
          justifyContent: justifyContent,
          alignItems: alignItems,
          direction: "rtl",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
        onClick={(e) => {
          if (!isViewMode) {
            e.stopPropagation();
            setActiveParagraph(paraIdx);
            setActiveRow(itemIdx);
            setActiveElement(null);
            setIsImageSelected(false);
            setActivePopup(null);
          }
        }}
      >
        {item.elements.map((el, idx2) => (
          <ParagraphContent
            key={idx2}
            item={el}
            itemIdx={idx2}
            paraIdx={paraIdx}
            rowIdx={itemIdx}
            paragraphs={paragraphs}
            activeParagraph={activeParagraph}
            activeRow={activeRow}
            activeElement={activeElement}
            setActiveParagraph={setActiveParagraph}
            setActiveRow={setActiveRow}
            setActiveElement={setActiveElement}
            setIsImageSelected={setIsImageSelected}
            setActivePopup={setActivePopup}
            handleTextResize={handleTextResize}
            setImageSettings={setImageSettings}
            setParagraphs={setParagraphs}
            isViewMode={isViewMode}
          />
        ))}

      </div>

      </>
  
    );
  }

  return null;
};

export default ParagraphContent;