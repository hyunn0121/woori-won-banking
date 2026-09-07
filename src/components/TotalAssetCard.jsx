// src/components/TotalAssetCard.jsx
import { useState } from 'react';

const TotalAssetCard = ({ accounts = [], hasError = false }) => {
  const [isHide, setIsHide] = useState(false);

  const totalBalance = accounts.reduce((acc, cur) => acc + cur.balance, 0);

  // 에러 발생 시 카드 내부 정보를 아예 숨김
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
          onClick={() => setIsHide(!isHide)}
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

export default TotalAssetCard;