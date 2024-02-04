import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor.js'
import DiaryList from './DiaryList.js';
import OptimizeTest from './OptimizeTest.js';

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

  //useMemo
  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((itm)=>itm.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount/data.length) * 100
      return {goodCount,badCount,goodRatio}
    },[data.length]
  )

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
     <OptimizeTest/>
     <DiaryEditor onCreate={onCreate}/>
     <div>전체 일기 : {data.length}</div>
     <div>좋은 일기 : {goodCount}</div>
     <div>나쁜 일기 : {badCount}</div>
     <div>좋은일기 비율 : {goodRatio} %</div>
     <DiaryList onRemove= {onRemove} onEdit= {onEdit} diaryItemList = {data}/>
    </div>
  );
}

export default App;
