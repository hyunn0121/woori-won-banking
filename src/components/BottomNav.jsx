import React from 'react';

const BottomNav = ({ onOpenTransfer, onGoHome, currentTab = '홈' }) => {
  return (
    <nav className="bottom-nav" aria-label="주요 화면 이동">
      <ul>
        <li>
          <button
            type="button"
            aria-current={currentTab === '홈' ? 'page' : undefined}
            onClick={() => {
              onGoHome?.();
            }}
          >
            <span className="nav-icon" aria-hidden="true">🏠</span>
            <span className="nav-lbl" style={{ color: currentTab === '홈' ? '#005BAC' : 'inherit' }}>홈</span>
          </button>
        </li>
        <li>
          <button 
            type="button" 
            aria-current={currentTab === '이체' ? 'page' : undefined}
            onClick={() => onOpenTransfer?.()}
          >
            <span className="nav-icon" aria-hidden="true">💸</span>
            <span className="nav-lbl" style={{ color: currentTab === '이체' ? '#005BAC' : 'inherit' }}>이체</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="nav-icon" aria-hidden="true">📋</span>
            <span className="nav-lbl">거래내역</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="nav-icon" aria-hidden="true">⋯</span>
            <span className="nav-lbl">전체</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;