// src/components/TotalAssetCard.jsx
const TotalAssetCard = ({ accounts = [], hasError = false, isHide = false, onToggleHide }) => {
  const totalBalance = accounts.reduce((acc, cur) => acc + cur.balance, 0);

  if (hasError) {
    return (
      <div className="total-card" style={{ opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
        <p style={{ fontSize: '13px', color: '#ffffff' }}>정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="total-card">
      <div className="total-card-head">
        <h2>총 자산</h2>
        <button 
          type="button" 
          className="eye-btn" 
          onClick={onToggleHide} // 상위에서 받은 토글 함수 실행
        >
          {isHide ? '보기' : '숨기기'}
        </button>
      </div>

      <p className="amount">
        {isHide ? '••••••••원' : `${totalBalance.toLocaleString()}원`}
      </p>

      <p className="sub">
        계좌 {accounts.length}개 합산 금액입니다
      </p>
    </div>
  );
};

export default TotalAssetCard