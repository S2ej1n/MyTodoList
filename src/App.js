import React, { useState, useRef } from 'react';
import styled from './App.module.css';

function App() {

  // 투두리스트에 이용하기 위한 값이고
  const [todoData, setTodoData] = useState([
    { id: 1, content: '뭔갈하기', finish: false },
    { id: 2, content: '마라탕먹기', finish: false },
  ]);

  // ref객체 만들기
  const valueref = useRef('');

  const clickSubmit = () => {
    const value = valueref.current.value;
    console.log(value);
    // 이 부분 렌더링 어떡하지
    if (value.length > 0) {

      let newData = {
        id: Date.now(),
        content: value,
        finish: false
      }

      setTodoData([...todoData, newData])
      valueref.current.value = '';
    }
  }

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      clickSubmit();
    }
  }
  
  const clickisFinish = (id) => {
    // 새로운 배열 반환할거임.
    let newData = todoData.map((e) => {
      if (e.id === id) {
        e.finish =! e.finish;
      }
      return e;
    })
    setTodoData(newData);
  }
  const deletehandler = (id) => {
    // 키값 비교
    // todoData 각 배열의 항목 e에서id 속성 가져옴. 다르면 통과
    let newData = todoData.filter((e) => e.id !== id);
    setTodoData(newData);
  }

  // 오늘 날짜
  const today = new Date();
  const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}.`;

  // 완료한거 몇개인지
  const how_many_finished = todoData.filter((e)=>e.finish).length

  return (
    <main className={styled.App}>
      <div className={styled.todoContainer}>

        {/* 메인 타이틀이고 */}
        <p className={styled.dateText}>{`🗓️ ${formattedDate}`}</p>
        <h1 className={styled.title}>Todo List</h1>

        {/* 인풋 넣기 */}
        <button className={styled.todoSubmit}
          onClick={clickSubmit}>
          ✏️
        </button>
        <input className={styled.todoInput}
          type="text"
          placeholder='오늘 할 일은?'
          ref={valueref} // 여기다가는 ref 연결해야됨. ref.crrent말고
          //기존 - value={value}로 사용했지만, 이거 다 지우고 ref사용하면된다. 여기에 정보가 다 넘어감.
          onKeyUp={enterKey}
        />

        {/* 투두리스트가 나오는 창 */}
        <section className={styled.listContainer}>
          {todoData.map((data) => (
            <div className={`${styled.todolist} ${data.finish ? styled.finished : ''}`} key={data.id}>
              {/* 이부분 고침. 스타일을 다르게 하기 위해서!!!!!!!!!------- */}
              <input className={styled.finishBox} type='checkbox'
                // 데이터 쩜 아이디 전달.
                onClick={() => {clickisFinish(data.id)}}
                id={`finishbox${data.id}`}
                />
                {/* 아이디를 다 다르게 설정해야함. */}
              <label className={styled.finishlabel} 
                for={`finishbox${data.id}`}>
                  {/* 바꿔줌 */}
                  {data.finish ? '🙆‍♀️' : '🙅'}
                </label>
              {data.content}
              <button className={styled.deleteBnt}
                onClick={()=>{deletehandler(data.id)}}>🗑️</button>
            </div>
          ))}
          <p className={styled.alrltText}>* 오늘 해야할 일 {todoData.length}개 중 {how_many_finished}개를 완료했어요</p>
        </section>
      </div>
    </main>
  );
}

export default App;
