import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
//Quill.register('modules/imageUpload', ImageUpload); // 커스텀 라이브러리를 등록해 준다.

interface IProps {}

interface IState {
  content: string
}

const modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video']
    ],
    // container:  [['bold', 'italic', 'underline', 'blockquote'],
    // [{'list': 'ordered'}, {'list': 'bullet'}],
    // ['formula','link', 'image'],
    // ['clean']],
    // handlers: { 'image' : this.handleImage }
  },
  /*
  imageUpload: {
    url: "image server url", // server url
    method: "POST", // change query method, default 'POST'
    name : 'images', // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
    headers: {
      Authorization: `Bearer tokenValue`, 
      'X-Total-Count': 0,
    },
    callbackOK: (serverResponse, next) => { // 성공하면 리턴되는 함수
        next(serverResponse);
    },
    callbackKO: (serverError) => { // 실패하면 리턴되는 함수
      console.log(serverError);
        // alert(serverError);
    },
    // optional
    // add callback when a image have been chosen
    checkBeforeSend: (file, next) => {
        console.log(file);
        next(file); // go back to component and send to the server
    }
  },
  */
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  // imageDrop: true, // imageDrop 등록
  // imageResize: {} // imageResize 등록
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

class MyTextEditor extends React.Component<IProps, IState>{
  
  constructor(props: IProps) {
    super(props);

    this.state = {
      content: ""
    }
  }

  render() {

    const { content } = this.state;

    const _onChangeEditor = (e: any) => {
      this.setState({
        content: e,
      })
    }
  
    return (
        <div className="editor">
          <ReactQuill
            value={content} // state 값
            theme="snow" // 테마값 이미 snow.css를 로드해서 제거해도 무망
            onChange={(e) => {_onChangeEditor(e)}}
            modules={modules}
            formats={formats}
            placeholder={'내용을 입력해주세요'}
          />
        </div>
    );
  }
}

export default MyTextEditor;