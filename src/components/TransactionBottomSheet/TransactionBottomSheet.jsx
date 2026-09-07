import React, { useState } from 'react';
import "./TransactionBottomSheet.css";

const TransactionDetailBottomSheet = ({ isOpen, onClose, data }) => {
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        data?.onSave?.();

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false)
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="bottom-sheet-overlay" onClick={onClose}>
            <div
                className="bottom-sheet-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 상단 드래그 핸들 바 */}
                <div className="sheet-handle" />

                {/* 가맹점 및 금액 정보 */}
                <div className="sheet-header">
                    <h2 className="store-name">{data?.storeName || '스타벅스 강남점'}</h2>
                    <div className="amount">{data?.amount || '-5,800'}원</div>
                </div>

                {/* 상세 거래 내역 목록 */}
                <div className="sheet-body">
                    <div className="detail-row">
                        <span className="label">거래일시</span>
                        <span className="value">{data?.date || '2026-08-23 09:12'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">거래계좌</span>
                        <span className="value">{data?.account || '우리 첫급여통장 (1002-***-123456)'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">거래 후 잔액</span>
                        <span className="value">{data?.balance || '2,384,560'}원</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">상태</span>
                        <span className="value">{data?.status || '완료'}</span>
                    </div>
                </div>

                {/* 하단 버튼 영역 */}
                <div className="sheet-footer">
                    <button className="btn-secondary" onClick={handleSave}>
                        이체확인증 저장
                    </button>
                    <button className="btn-primary" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
            {showToast && (
                <div className="toast">
                    이체 확인증이 저장되었습니다.
                </div>
            )}
        </div>
    );
};

export default TransactionDetailBottomSheet;