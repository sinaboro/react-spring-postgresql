// Ex0502List.jsx - 배열을 map 으로 목록 그리기 + key
//
// 이 예제가 보여 주는 것
//   - 배열.map(항목 => <태그>...</태그>) 로 배열의 칸마다 태그를 하나씩 만든다.
//   - 목록의 각 태그에는 key 를 꼭 준다. 어느 칸이 바뀌었는지 React 가 알아보는 이름표다.
//   - key 는 형제끼리 겹치지 않는 값(보통 DB 의 id)을 쓴다. 배열 순서(index)는 되도록 피한다.
//   - filter 로 걸러 낸 뒤 map 으로 그리면 "검색 결과" 가 된다.

// 서버에서 받아 왔다고 생각하자 (9장에서는 진짜로 Spring Boot 서버에서 받아 온다)
const products = [
  { id: 101, name: "키보드", price: 35000, stock: 5 },
  { id: 102, name: "마우스", price: 18000, stock: 0 },
  { id: 103, name: "모니터", price: 210000, stock: 2 },
  { id: 104, name: "USB 허브", price: 12000, stock: 11 },
];

function Ex0502List() {
  const inStock = products.filter((p) => p.stock > 0); // 재고가 있는 것만

  return (
    <div>
      <h3>전체 상품 ({products.length}개)</h3>
      <ul>
        {products.map((p) => (
          // key 는 map 이 돌려주는 "가장 바깥" 태그에 준다
          <li key={p.id}>
            {p.name} - {p.price.toLocaleString()}원 {/* 35000 → 35,000 */}
            {p.stock === 0 && <span style={{ color: "crimson" }}> (품절)</span>}
          </li>
        ))}
      </ul>

      <h3>구매 가능 ({inStock.length}개)</h3>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          {inStock.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ex0502List;
