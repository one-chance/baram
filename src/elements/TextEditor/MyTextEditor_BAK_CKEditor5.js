import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
        id="editor"
        editor={ ClassicEditor }
        data={content}
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );

          setContent(data);
        } }
        onBlur={ ( event, editor ) => {
          console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
      />
    </div>
  );
}

export default MyTextEditor;