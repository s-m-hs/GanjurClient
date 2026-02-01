import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
// import "quill/dist/quill.core.css";
import './darkTheme.css'

Quill.register('modules/imageResize', ImageResize);

const TextEditorDark = ({ value, onChange }) => {
    // const [value, setValue] = useState('');

    const modules = {
      toolbar: [
        [{ 'font': [ 'serif', 'monospace'] }],  // Custom font family list
        [{ 'size': ['small', false, 'large', 'huge'] }],  // Custom font size list
        [{ 'color': [] }, { 'background': [] }],  // Text color and background color
        [{ 'header': '1' }, { 'header': '2' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'align': [] }],
        [{ 'direction': 'rtl' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
        imageResize: {}
    };
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange }
            modules={modules}
            style={{ height: '400px', fontFamily: 'Yekan, sans-serif' }} // Inline style for testing  
            // style={{height:'400px'}}
        />
    );
};

export default TextEditorDark;
