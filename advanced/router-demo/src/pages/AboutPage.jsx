// AboutPage.jsx - 소개 화면 ( /about )
//   Route 에 연결된 평범한 컴포넌트다. 화면(page) 컴포넌트는 pages 폴더에 모아 두면 찾기 쉽다.

function AboutPage() {
  return (
    <div>
      <h2>소개</h2>
      <p>React Router 는 주소(URL)에 따라 다른 컴포넌트를 보여 주는 라이브러리입니다.</p>
      <p>주소가 바뀌므로 새로 고침해도 같은 화면이 보이고, 주소를 복사해 다른 사람에게 보낼 수도 있습니다.</p>
    </div>
  );
}

export default AboutPage;
