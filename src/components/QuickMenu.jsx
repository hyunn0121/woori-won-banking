import React from 'react';

const QuickMenu = ({ onOpenTransfer }) => {
  return (
    <ul className="quick-menu">
      <li>
        <button 
          type="button" 
          onClick={() => onOpenTransfer?.()}
        >
          <span className="icon" aria-hidden="true">💸</span>
          <span className="lbl">이체</span>
        </button>
      </li>
      <li>
        <button type="button">
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