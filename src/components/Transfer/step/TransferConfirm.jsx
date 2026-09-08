import React from 'react';
import './TransferConfirm.css';

const TransferConfirm = ({ data, onTransfer, onPrev, isTransferring, transferError }) => {
    // 금액 천 단위 콤마 포맷
    const formatAmount = (val) => {
        if (!val) return '0';

        return Number(val).toLocaleString();
    };

    return (
        <div className="transfer-confirm-wrapper">

            {/* 타이틀 영역 */}
            <div className="title-area">
                <h1 className="main-title">
                    이체 내용을 확인해주세요
                </h1>
            </div>

            {/* 카드 형태 상세 내역 */}
            <div className="confirm-card">

                {/* 받는 은행 */}
                <div className="confirm-row">
                    <span className="card-label">
                        받는 은행
                    </span>

                    <span className="card-value">
                        {data.bank}
                    </span>
                </div>

                {/* 계좌번호 */}
                <div className="confirm-row">
                    <span className="card-label">
                        계좌번호
                    </span>

                    <span className="card-value">
                        {data.accountNumber}
                    </span>
                </div>

                {/* 예금주 */}
                <div className="confirm-row">
                    <span className="card-label">
                        예금주
                    </span>

                    <span className="card-value">
                        {data.receiver}
                    </span>
                </div>

                {/* 출금 계좌 */}
                <div className="confirm-row">
                    <span className="card-label">
                        출금 계좌
                    </span>

                    <span className="card-value">
                        {data.myAccount}
                    </span>
                </div>

                {/* 구분 점선 */}
                <div className="card-divider"></div>

                {/* 이체 금액 */}
                <div className="confirm-row amount-row">
                    <span className="card-label">
                        이체 금액
                    </span>

                    <span className="amount-value">
                        {formatAmount(data.amount)}원
                    </span>
                </div>
            </div>

            {/* 이체 에러 */}
            {transferError && (
                <p className="transfer-error">
                    {transferError}
                </p>
            )}

            {/* 하단 버튼 */}
            <div className="button-area">
                <button
                    type="button"
                    className="btn-confirm"
                    onClick={onTransfer}
                    disabled={isTransferring}
                >
                    {isTransferring ? '이체 중...' : '이체하기'}
                </button>

                <button
                    type="button"
                    className="btn-prev"
                    onClick={onPrev}
                    disabled={isTransferring}
                >
                    이전으로
                </button>
            </div>
        </div>
    );
};

export default TransferConfirm;