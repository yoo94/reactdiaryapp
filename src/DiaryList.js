const DiaryList = ({diaryList}) => {

  DiaryList.defaultProps={
    diaryList:[]
  };

  return (
    <div className="DiaryList">
      <h4>일기 리스트 : {diaryList.length} 개</h4>
      {diaryList.map((itm) => (
        <div key={itm.id}>
          <div>작성자 : {itm.author}</div>
          <div>내용 : {itm.content}</div>
          <div>감정 점수 : {itm.emotion}</div>
          <div>작성날짜 : {itm.create_date}</div>
        </div>
      ))}
    </div>
  )
}
export default DiaryList