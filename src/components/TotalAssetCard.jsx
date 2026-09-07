// src/components/TotalAssetCard.jsx
import { useState } from 'react';

/**
 * [TotalAssetCard 컴포넌트]
 * 역할: 전체 계좌 잔액 합산 출력 및 보기/숨기기 토글
 * Props:
 *  - accounts: 계좌 정보 객체 배열
 */
const TotalAssetCard = ({ accounts = [] }) => {
  // 금액 숨김 여부 상태 (State Colocation 적용)
  const [isHide, setIsHide] = useState(false);

  // 모든 계좌 잔액 합산
  const totalBalance = accounts.reduce((acc, cur) => acc + cur.balance, 0);

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

      <p className="sub">계좌 {accounts.length}개 합산 금액입니다</p>
    </div>
  );
};

export default TotalAssetCard;