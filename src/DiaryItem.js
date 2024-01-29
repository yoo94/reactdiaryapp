const DiaryItem = ({author,content,emotion,create_date,id,onDelete}) => {
  
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
      <div>
        <button onClick={()=>{
            if (window.confirm("정말 삭제합니까?")) {
              onDelete(id)
            }
          }
        }> 삭제 </button> <button  > 수정 </button>
      </div>
    </div>
  )
}

export default DiaryItem;