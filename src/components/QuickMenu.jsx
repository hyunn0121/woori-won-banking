import React from 'react';

const QuickMenu = ({ onGoToHistory }) => {
  const handleMenuClick = (menuName) => {
    if (menuName === '거래내역') {
      if (onGoToHistory) onGoToHistory();
    } else {
      console.log(`👉 퀵메뉴 클릭됨: ${menuName}`);
    }
  };

  return (
    <ul className="quick-menu">
      <li>
        <button type="button" onClick={() => handleMenuClick('이체')}>
          <span className="icon" aria-hidden="true">💸</span>
          <span className="lbl">이체</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={() => handleMenuClick('거래내역')}>
          <span className="icon" aria-hidden="true">📋</span>
          <span className="lbl">거래내역</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={() => handleMenuClick('상품')}>
          <span className="icon" aria-hidden="true">📦</span>
          <span className="lbl">상품</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={() => handleMenuClick('자산관리')}>
          <span className="icon" aria-hidden="true">📊</span>
          <span className="lbl">자산관리</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={() => handleMenuClick('전체')}>
          <span className="icon" aria-hidden="true">⋯</span>
          <span className="lbl">전체</span>
        </button>
      </li>
    </ul>
  );
};

export default QuickMenu;