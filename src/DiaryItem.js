const DiaryItem = ({author,content,emotion,id,create_date}) => {
  
  return(
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 점수 : {emotion}
        </span>
        <span className="date">
          작성날짜 : {new Date(create_date).toLocaleString()}
        </span>
      </div>
      <div className="content">
        내용 : {content}
      </div>
    </div>
  )
}

export default DiaryItem;