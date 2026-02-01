// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParagraphsRenderer from "../components/ParagraphsRenderer";
import "./Home.css";

const Home = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("paragraphs"));
    if (savedData) {
      setParagraphs(savedData);
    }
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>محتوای ذخیره شده</h1>
        <button 
          className="edit-button"
          onClick={() => navigate("/")}
        >
          ویرایش محتوا
        </button>
      </header>
      
      {paragraphs.length === 0 ? (
        <div className="no-content">
          <p>هیچ محتوایی ذخیره نشده است</p>
          <button 
            className="create-content-button"
            onClick={() => navigate("/")}
          >
            ایجاد محتوای جدید
          </button>
        </div>
      ) : (
        <div className="content-wrapper">
          <ParagraphsRenderer
            paragraphs={paragraphs}
            activeParagraph={null}
            activeRow={null}
            activeElement={null}
            setActiveParagraph={() => {}}
            setActiveRow={() => {}}
            setActiveElement={() => {}}
            setIsImageSelected={() => {}}
            setActivePopup={() => {}}
            handleTextResize={() => {}}
            setImageSettings={() => {}}
            setParagraphs={() => {}}
            isViewMode={true}
          />
        </div>
      )}
    </div>
  );
};

export default Home;