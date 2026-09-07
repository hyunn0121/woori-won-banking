import React from 'react';
import './TransferConfirm.css';

const TransferConfirm = ({ data, onNext, onPrev }) => {
  // 금액 천 단위 콤마 포맷
  const formatAmount = (val) => {
    if (!val) return '0';
    return Number(val).toLocaleString();
  };

  const handleConfirm = () => {
    onNext(); // 완료 화면(Step 4)으로 이동
  };

  return (
    <div className="transfer-confirm-wrapper">
      {/* 타이틀 영역 */}
      <div className="title-area">
        <h1 className="main-title">이체 내용을 확인해주세요</h1>
      </div>

      {/* 카드 형태 상세 내역 박스 */}
      <div className="confirm-card">
        <div className="confirm-row">
          <span className="card-label">받는 분</span>
          <span className="card-value">{data.bank || '우리은행'}</span>
        </div>

        <div className="confirm-row">
          <span className="card-label">계좌번호</span>
          <span className="card-value">{data.accountNumber || '12345678910'}</span>
        </div>

        <div className="confirm-row">
          <span className="card-label">예금주</span>
          <span className="card-value">홍길동</span>
        </div>

        <div className="confirm-row">
          <span className="card-label">출금 계좌</span>
          <span className="card-value">
            {data.myAccount || '우리 첫급여통장 (1002-***-123456)'}
          </span>
        </div>

        {/* 구분 점선 */}
        <div className="card-divider"></div>

        {/* 이체 금액 (강조) */}
        <div className="confirm-row amount-row">
          <span className="card-label">이체 금액</span>
          <span className="amount-value">{formatAmount(data.amount)}원</span>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="button-area">
        <button type="button" className="btn-confirm" onClick={handleConfirm}>
          이체하기
        </button>
        <button type="button" className="btn-prev" onClick={onPrev}>
          이전으로
        </button>
      </div>
    </div>
  );
};

export default TransferConfirm;