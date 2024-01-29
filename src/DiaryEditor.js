import { useRef , useState } from "react";

const DiaryEditor = ({onCreate}) => {

  const authorInput = useRef();
  const contentInput = useRef();
  
  const [state,setstate] = useState({
      author: "",
      content:"",
      emotion: 1,
  });

  const handleChangeEvent = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setstate({
      ...state,
      [name] : value
    })
  }
  const handlesubmmit = ()=>{
    if(state.author.length < 1){
      authorInput.current.focus();
      return; 
    } 
    if(state.content.length < 1) {
      contentInput.current.focus();
      return; 
    } 
    onCreate(state.author, state.content, state.emotion)
    alert('저장성공');
    setstate({
      author :'',
      content :'',
      emotion :''
    })
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <span>작성자 </span>
        <input ref={authorInput} name="author" value={state.author} onChange={handleChangeEvent}/>
      </div>
      <div>
        <span>내용 </span>
        <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeEvent}/>
      </div>
      <div>
        <span>오늘의 감정점수  </span>
        <select name="emotion" value={state.emotion} onChange={handleChangeEvent}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button name="save" onClick={handlesubmmit}>일기 저장</button>
      </div>
    </div>
  );
};

export default DiaryEditor;