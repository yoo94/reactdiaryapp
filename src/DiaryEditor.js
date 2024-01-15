import { useState } from "react";

const DiaryEditor = () => {

  const [state,setstate] = useState({
      author: "",
      content:"",
  });

  const handleChangeEvent = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setstate({
      ...state,
      [name] : value
    })

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
    </div>
  );
};

export default DiaryEditor;