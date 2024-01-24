import './App.css';
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList';

const dummyList = [
  {
    id:1,
    author: "유재석",
    content:"나 유재석 ",
    emotion: 1,
    create_date : new Date().getTime(),
  },{
    id:2,
    author: "조연재",
    content:"나 조연쟈",
    emotion: 5,
    create_date : new Date().getTime(),

  },{
    id:3,
    author: "조연쟈",
    content:"아니 내가 조연쟈",
    emotion: 4,
    create_date : new Date().getTime(),
  },
]

function App() {
  return (
    <div className="App">
     <DiaryEditor/>
     <DiaryList diaryList = {dummyList}/>
    </div>
  );
}

export default App;
