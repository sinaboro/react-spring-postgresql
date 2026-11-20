// Ex0203Reducer.jsx - useReducer: state 를 바꾸는 방법이 여러 가지일 때
//
// 이 예제가 보여 주는 것
//   const [state, dispatch] = useReducer(리듀서함수, 처음값)
//   - 컴포넌트는 "무엇을 하고 싶은지" 만 dispatch({ type: ... }) 로 알린다.
//   - "어떻게 바꾸는지" 는 리듀서(cartReducer.js)가 모두 맡는다.
//   - useState 로도 만들 수 있지만, 바꾸는 방법(추가·감소·삭제·비우기)이 많아지면
//     컴포넌트 곳곳에 흩어진 set 코드를 리듀서 한 곳으로 모을 수 있어 읽기 쉬워진다.

import { useReducer } from "react";
import { cartReducer, initialCart } from "./cartReducer";

const PRODUCTS = [
  { id: 1, name: "키보드", price: 35000 },
  { id: 2, name: "마우스", price: 18000 },
  { id: 3, name: "모니터", price: 210000 },
];

function Ex0203Reducer() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // state 로부터 계산되는 값 (따로 state 로 만들지 않는다)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ display: "flex", gap: 30 }}>
      <div>
        <h3>상품</h3>
        {PRODUCTS.map((p) => (
          <div key={p.id}>
            {p.name} {p.price.toLocaleString()}원{" "}
            <button onClick={() => dispatch({ type: "add", product: p })}>담기</button>
          </div>
        ))}
      </div>
      <div>
        <h3>🛒 장바구니</h3>
        {cart.length === 0 && <p>비어 있습니다</p>}
        {cart.map((item) => (
          <div key={item.id}>
            {item.name} × {item.qty}{" "}
            <button onClick={() => dispatch({ type: "decrease", id: item.id })}>-</button>
            <button onClick={() => dispatch({ type: "add", product: item })}>+</button>
            <button onClick={() => dispatch({ type: "remove", id: item.id })}>빼기</button>
          </div>
        ))}
        <p>
          <strong>합계 {total.toLocaleString()}원</strong>
        </p>
        <button onClick={() => dispatch({ type: "clear" })}>비우기</button>
      </div>
    </div>
  );
}

export default Ex0203Reducer;
