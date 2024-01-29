import DiaryItem from  './DiaryItem.js';

const DiaryList = ({diaryItemList}) => {
  
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryItemList.length}개</h4>
      {diaryItemList.map((itm) => (
         <DiaryItem key={itm.id} {...itm}/>
      ))}
    </div>
  )
}

DiaryList.defaultProps={
    diaryItemList:[]
};
  
export default DiaryList