import React from 'react';
import CKEditor from 'ckeditor4-react';
import { useRecoilState } from 'recoil';
import { TextEditorState } from 'state/index';

/*
* copy code for Get SearchValue on the other component
import { useRecoilValue } from 'recoil';
import { TextEditorState } from 'state';

...

  const textEditorValue = useRecoilValue(TextEditorState);
*/
    
function MyTextEditor(){

  const [content, setContent] = useRecoilState(TextEditorState);

  return(
    <div className="TextEditor">
      <CKEditor
        data={content}
        onChange={( event ) => {
            const data = event.editor.getData();
            setContent(data);
        }}
        config={
          {
            resize_enabled: false
          }
        }
      />
    </div>
  );
}

export default MyTextEditor;