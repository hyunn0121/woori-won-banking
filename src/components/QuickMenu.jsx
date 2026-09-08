import React from 'react';

const QuickMenu = ({ onOpenTransfer, onGoToHistory }) => {
  const handleMenuClick = (menuName) => {
    if (menuName === '거래내역') {
      if (onGoToHistory) onGoToHistory();
    } else if (menuName === '이체') {
      if (onOpenTransfer) onOpenTransfer();
    } 
  };

  return (
    <ul className="quick-menu">
      <li>
        <button 
          type="button" 
          onClick={() => handleMenuClick('이체')}
        >
          <span className="icon" aria-hidden="true">💸</span>
          <span className="lbl">이체</span>
        </button>
      </li>
      <li>
        <button 
          type="button" 
          onClick={() => handleMenuClick('거래내역')}
        >
          <span className="icon" aria-hidden="true">📋</span>
          <span className="lbl">거래내역</span>
        </button>
      </li>
      <li>
        <button type="button">
          <span className="icon" aria-hidden="true">📦</span>
          <span className="lbl">상품</span>
        </button>
      </li>
      <li>
        <button type="button">
          <span className="icon" aria-hidden="true">📊</span>
          <span className="lbl">자산관리</span>
        </button>
      </li>
      <li>
        <button type="button">
          <span className="icon" aria-hidden="true">⋯</span>
          <span className="lbl">전체</span>
        </button>
      </li>
    </ul>
  );
};

export default QuickMenu;