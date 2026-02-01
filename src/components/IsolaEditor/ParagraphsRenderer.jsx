// src/components/ParagraphsRenderer/ParagraphsRenderer.jsx
import React from "react";
import ParagraphContent from "./ParagraphContent";
import "./ParagraphsRenderer.css";

const ParagraphsRenderer = ({
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
  isViewMode = false // Add this prop for Home page
}) => {
  const alignSelfValue = (alignment) => {
    switch (alignment) {
      case "left":
        return "flex-end";
      case "center": 
        return "center";
      case "right":
        return "flex-start";
      default:
        return "flex-start";
    }
  };

  return (
    <div className={`content-area ${isViewMode ? 'view-mode' : ''}`}>
      {paragraphs?.map((paraContent, paraIdx) => {
        const flexDirection =
          paraContent.layout === "horizontal" ? "row" : "column";
        const justifyContent =
          flexDirection === "row"
            ? alignSelfValue(paraContent.isAligned)
            : "flex-start";
        const alignItems =
          flexDirection === "column"
            ? alignSelfValue(paraContent.isAligned)
            : "flex-start";

        return (
          <div
            key={paraIdx}
            className={`paragraph-block ${isViewMode ? 'view-mode' : ''}`}
            style={{
              display: "flex",
              flexDirection: flexDirection,
              flexWrap: "wrap",
              gap: `${paraContent.gap || 20}px`, // Default gap increased to 20px
              border: isViewMode ? "none" : 
                (activeParagraph === paraIdx
                  ? "2px solid #3c3b39"
                  : paraContent.border || "1px solid #b3d8f5"),
              marginBottom: `${paraContent.marginBottom || 20}px`,
              padding: isViewMode ? "0" : "16px",
              borderRadius: "8px",
              cursor: isViewMode ? "default" : "pointer",
              backgroundColor: isViewMode ? "transparent" : (paraContent.backgroundColor || "#ffffff"),
              justifyContent: justifyContent,
              alignItems: alignItems,
              direction: "rtl",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
            onClick={(e) => {
              if (isViewMode) return;
              e.stopPropagation();
              setActiveParagraph(paraIdx);
              setActiveRow(null);
              setActiveElement(null);
              setIsImageSelected(false);
              setActivePopup(null);
            }}
          >
            {paraContent.elements.map((item, itemIdx) => (
              <ParagraphContent
                key={itemIdx}
                item={item}
                itemIdx={itemIdx}
                paraIdx={paraIdx}
                rowIdx={null}
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
        );
      })}
    </div>
  );
};

export default ParagraphsRenderer;