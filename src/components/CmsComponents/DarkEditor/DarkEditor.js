import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
import 'react-quill/dist/quill.snow.css';
// import './fontcss.css';
import './DarkEditor.css'; // Import CSS file for custom dark theme

Quill.register('modules/imageResize', ImageResize);

const DarkEditor = ({ value, onChange }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const modules = {
        toolbar: [
            [{ 'font': ['serif', 'monospace'] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'header': '1' }, { 'header': '2' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'direction': 'rtl' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        imageResize: {},
    };

    const toggleDarkMode = (e) => {
        e.preventDefault()
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <button onClick={toggleDarkMode} style={{ marginBottom: '10px' }}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                className={isDarkMode ? 'quill-dark' : 'quill-light'} // Toggle class based on dark mode
                style={{ height: '400px', fontFamily: 'Yekan, sans-serif' }}
            />
        </div>
    );
};

export default DarkEditor;
