import './App.css'; 
// 1. App.css 파일에 정의된 스마트폰 목업 스타일(너비, 테두리 등)을 불러옵니다.

import { TransactionSection } from './components/TransactionSection'; 
// 2. 다른 파일에 만들어 둔 거래내역 전체 화면 컴포넌트 부품을 가져옵니다.

function App() {
  return (
    // 3. className="app"을 통해 App.css의 .app 스타일(스마트폰 박스)을 적용합니다.
    <div className="app">
      {/* 4. 스마트폰 박스 안에 가져온 거래내역 컴포넌트를 조립(렌더링)합니다. */}
      <TransactionSection />
    </div>
  );
}

// 5. App 컴포넌트를 main.jsx에서 가져다 브라우저에 띄울 수 있도록 대표(default)로 내보냅니다.
export default App;