import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor.js'
import DiaryList from './DiaryList.js';

function App() {

  const [data,setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author,content,emotion) =>{
    const create_date = new Date().getTime();
    const newItem ={
      author,
      content,
      emotion,
      create_date,
      id: dataId.current,
    }
    dataId.current += 1;
    setData([newItem , ...data])
  }

  const onDelete = (targetId) => {
    const newDiaryList = data.filter((itm)=>{
      return itm.id !== targetId
    })
    setData(newDiaryList);
    alert("삭제가 완료되었습니다.")
  }

  return (
    <div className="App">
     <DiaryEditor onCreate={onCreate}/>
     <DiaryList onDelete= {onDelete} diaryItemList = {data}/>
    </div>
  );
}

export default App;
