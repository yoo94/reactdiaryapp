import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor.js'
import DiaryList from './DiaryList.js';


//https://jsonplaceholder.typicode.com/comments
const App = () => {
  const [data,setData] = useState([]);
  const dataId = useRef(0);

  //api 
  const getData = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res)=> res.json());
    
    const initData = res.slice(0,20).map((itm)=>{
      return{
        author:itm.email,
        content:itm.body,
        emotion:Math.floor(Math.random() * 5) +1,
        create_date: new Date().getTime,
        id : dataId.current++
      }
    })
    setData(initData)
  };

  useEffect(()=>{
    getData();
  },[])

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

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((itm)=>{
      return itm.id !== targetId
    })
    setData(newDiaryList);
    alert("삭제가 완료되었습니다.")
  }
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((itm)=>{
        return itm.id === targetId ?  {...itm, content:newContent} : itm
      })
    )
  }

  return (
    <div className="App">
     <DiaryEditor onCreate={onCreate}/>
     <DiaryList onRemove= {onRemove} onEdit= {onEdit} diaryItemList = {data}/>
    </div>
  );
}

export default App;
