import React from 'react';
import './TransferComplete.css';

const TransferComplete = ({ data, onReset }) => {
  // 금액 천 단위 콤마 포맷
  const formatAmount = (val) => {
    if (!val) return '0';
    return Number(val).toLocaleString();
  };

  // 출금 계좌 이름 추출 (기본값 설정)
  const accountName = data.myAccount ? data.myAccount.split(' ')[0] + ' ' + data.myAccount.split(' ')[1] : '우리 첫급여통장';
  const receiverName = data.receiver || '홍길동';

  return (
    <div className="transfer-complete-wrapper">
      <div className="complete-content">
        {/* 체크 아이콘 원형 배경 */}
        <div className="check-icon-circle">
          <svg
            className="check-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        {/* 완료 메인 타이틀 */}
        <h1 className="complete-title">이체가 완료되었습니다</h1>

        {/* 안내 서브 텍스트 */}
        <p className="complete-sub-text">
          {accountName}에서 {receiverName}님께 {formatAmount(data.amount)}원을 보냈습니다
        </p>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="button-area">
        <button type="button" className="btn-home" onClick={onReset}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default TransferComplete;