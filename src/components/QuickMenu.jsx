
/**
 * [QuickMenu 컴포넌트]
 * 역할: 자주 쓰는 주요 메뉴(이체, 거래내역, 상품, 자산관리, 전체) 숏컷 버튼 목록 출력
 */

import React from 'react'

const QuickMenu = () => {

  const handleMenuClick = (menuName) => {
    console.log(`👉 퀵메뉴 클릭됨: ${menuName}`);
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

export default QuickMenu