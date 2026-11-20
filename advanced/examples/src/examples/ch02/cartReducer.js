// cartReducer.js - 장바구니 state 를 바꾸는 규칙을 한 곳에 모은 "리듀서" 함수
//
// 이 파일이 보여 주는 것
//   - 리듀서 = (지금 state, 행동 action) → 새 state 를 돌려주는 "순수 함수"
//   - action 은 보통 { type: "무엇을", ...필요한 값 } 모양의 객체
//   - 컴포넌트 밖의 평범한 함수이므로 React 없이도 테스트할 수 있다.
//   - 여기서도 state 를 직접 고치지 않고 새 배열/객체를 만든다 (기초 과정의 불변성 그대로)

export const initialCart = []; // [{ id, name, price, qty }]

export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const found = state.find((item) => item.id === action.product.id);
      if (found) {
        // 이미 담긴 상품이면 수량만 +1
        return state.map((item) => (item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...state, { ...action.product, qty: 1 }]; // 처음 담는 상품
    }
    case "decrease":
      return state
        .map((item) => (item.id === action.id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0); // 0 개가 되면 뺀다
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "clear":
      return initialCart;
    default:
      throw new Error(`모르는 action: ${action.type}`); // 오타를 빨리 알아채기 위해
  }
}
