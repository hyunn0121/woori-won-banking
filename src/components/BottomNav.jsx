import React from 'react';

const BottomNav = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="bottom-nav" aria-label="주요 화면 이동">
      <ul>
        <li>
          <button
            type="button"
            aria-current={activeTab === 'home' ? 'page' : undefined}
            onClick={() => onChangeTab('홈')}
          >
            <span className="nav-icon" aria-hidden="true">🏠</span>
            <span className="nav-lbl">홈</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onChangeTab('이체')}>
            <span className="nav-icon" aria-hidden="true">💸</span>
            <span className="nav-lbl">이체</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-current={activeTab === 'history' ? 'page' : undefined}
            onClick={() => onChangeTab('거래내역')}
          >
            <span className="nav-icon" aria-hidden="true">📋</span>
            <span className="nav-lbl">거래내역</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onChangeTab('전체')}>
            <span className="nav-icon" aria-hidden="true">⋯</span>
            <span className="nav-lbl">전체</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;