// Box.jsx - children: 태그 사이에 넣은 내용을 받는 특별한 prop
//
// 이 예제가 보여 주는 것
//   - <Box title="공지">여기 내용</Box> 처럼 여는 태그와 닫는 태그 사이에 넣은 JSX 는
//     props.children 으로 들어온다.
//   - 테두리·제목처럼 "겉모양" 은 Box 가 맡고, 안의 내용은 쓰는 쪽이 정한다 → 재사용이 쉽다.

function Box({ title, children }) {
  return (
    <section style={{ border: "2px solid #03588C", borderRadius: 8, padding: 10, margin: "8px 0" }}>
      <strong style={{ color: "#03588C" }}>{title}</strong>
      <div>{children}</div> {/* 태그 사이에 넣은 내용이 이 자리에 들어간다 */}
    </section>
  );
}

export default Box;
