// Ex0703TodoApp.jsx - 지금까지 배운 것을 모은 작은 앱: 할 일 목록
//
// 이 예제가 보여 주는 것 (6장 + 7장 종합)
//   - 할 일 배열(todos)은 부모(TodoApp)가 state 로 가진다 → 목록·개수 표시가 함께 쓰기 때문
//   - 추가(Create) : [...todos, 새 할 일]
//   - 읽기(Read)   : todos.map(...) 으로 목록 그리기
//   - 수정(Update) : map 으로 그 id 만 done 을 뒤집기
//   - 삭제(Delete) : filter 로 그 id 빼기
//   9장에서는 이 배열을 브라우저 메모리가 아니라 PostgreSQL 에 저장한다.

import { useState } from "react";
import TodoForm from "./todo/TodoForm";
import TodoItem from "./todo/TodoItem";

function Ex0703TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "React 설치하기", done: true },
    { id: 2, text: "할 일 앱 만들기", done: false },
  ]);
  const [nextId, setNextId] = useState(3);

  const addTodo = (text) => {
    setTodos([...todos, { id: nextId, text, done: false }]); // Create
    setNextId(nextId + 1);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))); // Update
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id)); // Delete
  };

  const left = todos.filter((t) => !t.done).length; // state 로부터 계산할 수 있는 값은 state 로 만들지 않는다

  return (
    <div>
      <h2>📝 할 일 ({left}개 남음)</h2>
      <TodoForm onAdd={addTodo} />
      {todos.length === 0 ? (
        <p>할 일이 없습니다. 하나 추가해 보세요!</p>
      ) : (
        <ul>
          {todos.map((t) => (
            <TodoItem key={t.id} todo={t} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Ex0703TodoApp;
