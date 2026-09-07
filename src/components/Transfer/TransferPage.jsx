import React, { useState } from 'react';
import './TransferPage.css';
import AccountInput from './step/AccountInput';
import './step/AccountInput.css';
import AmountInput from './step/AmountInput';
import TransferConfirm from './step/TransferConfirm';
import TransferComplete from './step/TransferComplete';

const TransferPage = ({ onPageClose }) => {
    // 현재 이체 단계 관리 (1: 계좌입력, 2: 금액입력 ...)
    const [step, setStep] = useState(1);

    // 이체 전체 과정에서 사용하는 입력 데이터
    const [transferData, setTransferData] = useState({
        myAccount: '우리 첫급여통장 (2,294,560원)',
        bank: '국민은행',
        accountNumber: '',
    });

    // 데이터 업데이트 함수
    const updateTransferData = (newData) => {
        setTransferData((prev) => ({ ...prev, ...newData }));
    };

    const handlePrev = () => {
        setStep((prev) => prev - 1);
    };

    const handleNext = () => {
        setStep((prev) => prev + 1); // 다음 단계(금액 입력)로 이동
    };

    const handleBack = () => {
        if (step === 1) {
            onPageClose?.(); // 1단계에서 뒤로가기 누르면 페이지 닫기
        } else {
            setStep((prev) => prev - 1);
        }
    };

    // 처음(1단계)으로 돌아가기 및 데이터 초기화
    const handleReset = () => {
        setTransferData({
            bank: '우리은행',
            accountNumber: '',
            amount: '',
            myAccount: '우리 첫급여통장 (1002-***-123456)',
            receiver: '홍길동',
        });
        setStep(1);
    };

    return (
        <div className="transfer-container">
            {/* 상단 헤더 */}
            <header className="transfer-header">
                <button type="button" className="btn-back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </header>

            {/* 단계별 메인 뷰 */}
            <main className="transfer-content">
                {step === 1 && (
                    <AccountInput
                        data={transferData}
                        updateData={updateTransferData}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && (
                    <AmountInput
                        data={transferData}
                        updateData={updateTransferData}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {step === 3 && (
                    <TransferConfirm
                        data={transferData}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {step === 4 && (
                    <TransferComplete
                        data={transferData}
                        onReset={handleReset}
                    />
                )}
            </main>
        </div>
    );
};

export default TransferPage;