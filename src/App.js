import React, { useState, useRef } from 'react';
import styled from './App.module.css';

function App() {

  // 투두리스트에 이용하기 위한 값이고
  const [todoData, setTodoData] = useState([
    { id: 1, content: '뭔갈하기', finish: false },
    { id: 2, content: '마라탕먹기', finish: false },
  ]);
  // 이거는 입력될때의 값.
  const [value, setValue] = useState('');

  const valueref = useRef('');

  const inputChange = (e) => {
    // setValue(e.target.value);
    console.log('렌더링' + e.target.value);
    // console.log(valueref.current);
    valueref.current = e.target.value;
    // 이게아닌가..
  }

  const clickSubmit = () => {
    let newData = {
      id: Date.now(),
      content: valueref.current,
      // content: value,
      finish: false
    }
    // setTodoData([...todoData, newData])
    // setValue("");
    if (newData.content.length > 0) {
      setTodoData([...todoData, newData])
      setValue("");
    }
  }

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      clickSubmit();
    }
  }
  
  return (
    <main className={styled.App}>
      <div className={styled.todoContainer}>

        {/* 메인 타이틀이고 */}
        <h1 className={styled.title}>Todo List</h1>

        {/* 인풋 넣기 */}
        <button className={styled.todoSubmit}
          onClick={clickSubmit}>
          ✏️
        </button>
        {/* 여기 값이 변경될때 값을 변경해야겠지. */}
        {/* 값 변경될때마다 자꾸 렌더링됨 */}
        <input className={styled.todoInput}
          type="text"
          placeholder='오늘 할 일은?'
          value={valueref.current}
          // value={value}
          onChange={inputChange}
          onKeyUp={enterKey}
        />

        {/* 투두리스트가 나오는 창 */}
        <section className={styled.listContainer}>
          {todoData.map((data) => (
            <div className={styled.todolist} key={data.id}>
              {data.content}
              <button className={styled.deleteBnt}>X</button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
