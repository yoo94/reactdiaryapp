import { useState ,useRef,useContext} from "react"
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({author,content,emotion,create_date,id}) => {
  
  const {onRemove} = useContext(DiaryDispatchContext)
  const {onEdit} = useContext(DiaryDispatchContext)

  const [isEdit,setisEdit] = useState(false);
  const [updateContent,setupdateContent] = useState(content);
  const updateContentInput = useRef();

  
  const toggleIsEdit =() => setisEdit(!isEdit);

  const handleRemove = ()=>{
    if (window.confirm(id+"번째 일기를 정말 삭제합니까?")) {
      onRemove(id)
    }
  }

  const handleEdit = ()=>{
    setisEdit(false);
    setupdateContent(content);
  }
  
  const handleSaveEdit = ()=>{
    if(updateContent.length < 5) {
      updateContentInput.current.focus();
      return
    }
    if(window.confirm(" 내용을 수정하시겠습니까?")){
      onEdit(id,updateContent);
      toggleIsEdit();
    }
    
  }
  
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
        {isEdit ? 
        <textarea ref={updateContentInput} value={updateContent} onChange={(e)=>{setupdateContent(e.target.value)}}/> 
        : 
        <>내용 : {content}</>}
      </div>
      {isEdit ? 
       <>
       <div>
        <button onClick={handleEdit}> 수정취소 </button>
        <button onClick={handleSaveEdit}> 수정저장 </button>
      </div>
       </> 
      :
       <>
       <div>
        <button onClick={handleRemove}> 삭제 </button>
        <button onClick={toggleIsEdit}> 수정 </button>
      </div>
       </>
       }
      
    </div>
  )
}

export default DiaryItem;