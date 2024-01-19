import { useState } from "react";

const DiaryEditor = () => {

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
    console.log(state)
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input name="author" value={state.autor} onChange={handleChangeEvent}/>
      </div>
      <div>
        <textarea name="content" value={state.content} onChange={handleChangeEvent}/>
      </div>
      <div>
        <div>오늘의 감정점수  </div>
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