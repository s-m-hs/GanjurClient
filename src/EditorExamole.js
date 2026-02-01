import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState, AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Resizable } from 're-resizable';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Image = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src, width: initialWidth, height: initialHeight } = entity.getData();

  const [dimensions, setDimensions] = useState({
    width: initialWidth || 'auto',
    height: initialHeight || 'auto',
  });

  const handleResizeStop = (e, direction, ref, d) => {
    const newWidth = ref.style.width;
    const newHeight = ref.style.height;

    setDimensions({
      width: newWidth,
      height: newHeight,
    });

    props.contentState.mergeEntityData(props.block.getEntityAt(0), {
      width: newWidth,
      height: newHeight,
    });
  };

  return (
    <Resizable
      size={{ width: dimensions.width, height: dimensions.height }}
      onResizeStop={handleResizeStop}
      style={{ display: 'inline-block' }}
    >
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: '100%' }}
      />
    </Resizable>
  );
};

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const html = '<p></p>';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
  });

  const [ckValue, setCkValue] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setCkValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { 
          src: e.target.result, 
          width: 'auto', 
          height: 'auto' 
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        const editorStateWithImage = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
        setEditorState(editorStateWithImage);
        resolve({ data: { link: e.target.result } });
      };
      reader.readAsDataURL(file);
    });
  };

  const blockRendererFn = (contentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      const entity = editorState.getCurrentContent().getEntity(contentBlock.getEntityAt(0));
      const type = entity.getType();

      if (type === 'IMAGE') {
        return {
          component: Image,
          editable: false,
        };
      }
    }
    return null;
  };

  return (
    <div>
      <Editor
        toolbar={{
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: true, mandatory: false },
            defaultSize: {
              width: '100%',
              height: 'auto',
            },
          },
        }}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        blockRendererFn={blockRendererFn}
      />
    </div>
  );
};

export default TextEditor;
