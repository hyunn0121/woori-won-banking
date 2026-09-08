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
    const [isTransferring, setIsTransferring] = useState(false);
    const [transferError, setTransferError] = useState('');
    const [transferResult, setTransferResult] = useState(null);

    // 이체 전체 과정에서 사용하는 입력 데이터
    const [transferData, setTransferData] = useState({
        fromAccountId: 'account-001',
        myAccount: '우리 첫급여통장 (2,294,560원)',
        bank: '국민은행',
        accountNumber: '',
        receiver: '',
        amount: '',
    });

    // 데이터 업데이트 함수
    const updateTransferData = (newData) => {
        setTransferData((prev) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setStep((prev) => prev - 1);
    };

    const handleTransfer = async () => {
        try {
            setIsTransferring(true);
            setTransferError('');

            const response = await fetch('/api/transfers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fromAccountId: transferData.fromAccountId,
                    toBank: transferData.bank,
                    toAccountNo: transferData.accountNumber,
                    toOwnerName: transferData.receiver,
                    amount: Number(transferData.amount),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            setTransferResult(result);

            setStep(4);
        } catch (error) {
            setTransferError(error.message);
        } finally {
            setIsTransferring(false);
        }
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
            fromAccountId: '실제_ACCOUNT_ID',
            myAccount: '우리 첫급여통장 (1002-***-123456)',
            bank: '우리은행',
            accountNumber: '',
            receiver: '홍길동',
            amount: '',
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
                        onTransfer={handleTransfer}
                        onPrev={handlePrev}
                        isTransferring={isTransferring}
                        transferError={transferError}
                    />
                )}
                {step === 4 && (
                    <TransferComplete
                        data={transferData}
                        result={transferResult}
                        onReset={handleReset}
                    />
                )}
            </main>
        </div>
    );
};

export default TransferPage;