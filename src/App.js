import React,{ useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor.js'
import DiaryList from './DiaryList.js';

const reducer = (state,action) =>{
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
       const create_date = new Date().getTime();
       const newItem ={
        ...action.data,
        create_date
       }
       return [newItem,...state]
    }
    case 'REMOVE':{
      return state.filter((itm)=>{return itm.id !== action.targetId});
    }
    case 'EDIT':{
      return state.map((itm)=>{
        return itm.id === action.targetId ?  {...itm, content:action.newContent} : itm
      })
    }
    default : return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
  // const [data,setData] = useState([]);

  const [data,dispatch] = useReducer(reducer,[])
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
    dispatch({type:'INIT',data:initData},[])
  };

  useEffect(()=>{
    getData();
  },[])

  const onCreate = useCallback(
    (author,content,emotion) =>{
      const create_date = new Date().getTime();
      dataId.current += 1;
     dispatch({type:'CREATE',data:{
        author,
        content,
        emotion,
        create_date,
        id: dataId.current,}
      },[])
    }
  )

  const onRemove = (targetId) => {
    dispatch({type:'REMOVE',targetId},[])
    alert("삭제가 완료되었습니다.")
  }

  const onEdit = (targetId, newContent) => {
    dispatch({type:'EDIT',targetId,newContent},[])
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

  const memoizedDispatches = useMemo(()=>{
        return {onCreate,onEdit,onRemove};
  },[])

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
          <div className="App">
            <DiaryEditor/>
            <div>전체 일기 : {data.length}</div>
            <div>좋은 일기 : {goodCount}</div>
            <div>나쁜 일기 : {badCount}</div>
            <div>좋은일기 비율 : {goodRatio} %</div>
            <DiaryList/>
          </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
