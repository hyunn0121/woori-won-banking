import React from 'react';
import './TransferComplete.css';

const TransferComplete = ({ data, result, onReset }) => {
    const formatAmount = (val) => {
        if (!val) return '0';

        return Number(val).toLocaleString();
    };

    const transaction = result?.transaction;

    const accountName = data.myAccount || '출금 계좌';
    const receiverName = data.receiver || '받는 분';

    return (
        <div className="transfer-complete-wrapper">
            <div className="complete-content">

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
                        />
                    </svg>
                </div>

                <h1 className="complete-title">
                    이체가 완료되었습니다
                </h1>

                <p className="complete-sub-text">
                    {accountName}에서 {receiverName}님께{' '}
                    {formatAmount(transaction?.amount)}원을 보냈습니다
                </p>

                <p>
                    이체 후 잔액{' '}
                    {formatAmount(transaction?.balanceAfter)}원
                </p>

            </div>

            <div className="button-area">
                <button
                    type="button"
                    className="btn-home"
                    onClick={onReset}
                >
                    홈으로
                </button>
            </div>
        </div>
    );
};

export default TransferComplete;