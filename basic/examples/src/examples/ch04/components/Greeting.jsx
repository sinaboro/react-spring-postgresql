// Greeting.jsx - props 를 받는 가장 작은 컴포넌트 (파일 하나 = 컴포넌트 하나)
//
// 이 예제가 보여 주는 것
//   - 부모가 <Greeting name="민수" /> 처럼 속성을 쓰면, 그 값들이 객체 하나(props)로 들어온다.
//   - 매개변수 자리에서 { name } 으로 구조 분해하면 props.name 대신 name 으로 바로 쓸 수 있다.
//   - = "손님" 은 부모가 name 을 안 넘겼을 때 쓸 기본값이다.

function Greeting({ name = "손님" }) {
  return <p>👋 반가워요, {name} 님!</p>;
}

export default Greeting;
