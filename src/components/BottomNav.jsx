import React from 'react';

const BottomNav = ({ activeTab, onChangeTab, onOpenTransfer, onGoHome }) => {
  return (
    <nav className="bottom-nav" aria-label="주요 화면 이동">
      <ul>
        {/* 홈 탭 */}
        <li>
          <button
            type="button"
            aria-current={activeTab === 'home' || activeTab === '홈' ? 'page' : undefined}
            onClick={() => {
              onGoHome?.();
              onChangeTab?.('홈');
            }}
          >
            <span className="nav-icon" aria-hidden="true">🏠</span>
            <span 
              className="nav-lbl" 
              style={{ color: (activeTab === 'home' || activeTab === '홈') ? '#005BAC' : 'inherit' }}
            >
              홈
            </span>
          </button>
        </li>

        {/* 이체 탭 */}
        <li>
          <button 
            type="button"
            aria-current={activeTab === '이체' ? 'page' : undefined}
            onClick={() => {
              onOpenTransfer?.();
              onChangeTab?.('이체');
            }}
          >
            <span className="nav-icon" aria-hidden="true">💸</span>
            <span 
              className="nav-lbl" 
              style={{ color: activeTab === '이체' ? '#005BAC' : 'inherit' }}
            >
              이체
            </span>
          </button>
        </li>

        {/* 거래내역 탭 */}
        <li>
          <button
            type="button"
            aria-current={activeTab === 'history' || activeTab === '거래내역' ? 'page' : undefined}
            onClick={() => onChangeTab?.('거래내역')}
          >
            <span className="nav-icon" aria-hidden="true">📋</span>
            <span 
              className="nav-lbl" 
              style={{ color: (activeTab === 'history' || activeTab === '거래내역') ? '#005BAC' : 'inherit' }}
            >
              거래내역
            </span>
          </button>
        </li>

        {/* 전체 메뉴 탭 */}
        <li>
          <button
            type="button"
            onClick={() => onChangeTab?.('전체')}
          >
            <span className="nav-icon" aria-hidden="true">⋯</span>
            <span className="nav-lbl">전체</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;