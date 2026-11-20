// TodoItem.jsx - 할 일 한 줄 (자식 컴포넌트)
//
// 이 컴포넌트가 하는 일
//   - 할 일 하나(todo)를 받아 그린다.
//   - 체크박스·삭제 버튼을 누르면 부모가 내려준 함수에 id 를 넘겨 알린다.
//   - 자기 state 는 없다. 받은 값을 그리기만 하는 "보여 주기 전용" 컴포넌트.

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      {/* 끝낸 일은 가운데 줄을 긋는다: 조건에 따라 style 값을 고른다 */}
      <span style={{ textDecoration: todo.done ? "line-through" : "none", margin: "0 8px" }}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
