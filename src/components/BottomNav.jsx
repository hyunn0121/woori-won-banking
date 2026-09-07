import React from 'react'

/**
 * [BottomNav 컴포넌트]
 * 역할: 화면 최하단에 고정되는 주요 탭 네비게이션 (홈, 이체, 거래내역, 전체)
 */
const BottomNav = () => {
 
  const handleNavClick = (tabName) => {
    console.log(`👉 하단 네비게이션 탭 클릭됨: ${tabName}`);
  };

  return (
    <nav className="bottom-nav" aria-label="주요 화면 이동">
      <ul>
        <li>
          {/* 현재 활성화된 페이지를 나타내기 위해 aria-current="page" 유지 */}
          <button
            type="button"
            aria-current="page"
            onClick={() => handleNavClick('홈')}
          >
            <span className="nav-icon" aria-hidden="true">🏠</span>
            <span className="nav-lbl">홈</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleNavClick('이체')}>
            <span className="nav-icon" aria-hidden="true">💸</span>
            <span className="nav-lbl">이체</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleNavClick('거래내역')}>
            <span className="nav-icon" aria-hidden="true">📋</span>
            <span className="nav-lbl">거래내역</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleNavClick('전체')}>
            <span className="nav-icon" aria-hidden="true">⋯</span>
            <span className="nav-lbl">전체</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav