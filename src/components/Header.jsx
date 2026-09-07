// src/components/Header.jsx

/**
 * [Header 컴포넌트]
 * 역할: 서비스 로고(브랜드명) 및 상단 유틸리티 아이콘(알림, 전체메뉴) 출력
 */
const Header = () => {
    return (
        <header className="app-header">
            {/* 브랜드 로고 영역 */}
            <div className="brand">
                <span className="brand-mark">W</span>
                <h1 className="brand-name">WON 실습뱅킹</h1>
            </div>

            {/* 우측 상단 유틸리티 버튼 영역 */}
            <div className="header-icons">
                {/* 접근성 향상을 위해 시각적 텍스트가 없는 버튼에는 aria-label 부여 */}
                <button type="button" aria-label="알림">
                    🔔
                </button>
                <button type="button" aria-label="전체 메뉴">
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;