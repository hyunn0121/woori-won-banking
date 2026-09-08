import React, { useEffect, useState } from 'react';
import './AmountInput.css';

const AmountInput = ({ data, updateData, onNext, onPrev }) => {
    const numAmount = Number(data.amount || 0);

    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [accountError, setAccountError] = useState('');

    // 조건 상태 분기
    const isLessThanMin = data.amount && numAmount > 0 && numAmount < 100;
    const isExceedBalance = numAmount > balance;
    const isValidSuccess = numAmount >= 100 && numAmount <= balance;

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                setIsLoading(true);
                setAccountError('');

                const response = await fetch(
                    `api/accounts/${data.fromAccountId}`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message);
                }

                setBalance(result.balance);
            } catch (error) {
                setAccountError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (data.fromAccountId) {
            fetchAccount();
        }
    }, [data.fromAccountId]);

    // 다음 버튼은 잔액 이하 및 100원 이상일 때만 활성화
    const isFormValid = isValidSuccess;

    // 숫자에 콤마 붙여주는 함수 (예: 10000 -> 10,000)
    const formatAmount = (val) => {
        if (!val && val !== 0) return '0';
        return Number(val).toLocaleString();
    };

    // 키보드로 직접 입력할 때
    const handleInputChange = (e) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        updateData({ amount: onlyNumbers });
    };

    // 퀵 금액 버튼 클릭시 금액 누적 (+1만, +5만, +10만)
    const handleAddAmount = (addValue) => {
        const currentAmount = Number(data.amount || 0);
        updateData({ amount: String(currentAmount + addValue) });
    };

    // 직접입력 클릭시 초기화
    const handleResetAmount = () => {
        updateData({ amount: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onNext();
        }
    };

    // input 클래스 조건부 부여
    const getInputClassName = () => {
        if (isLessThanMin || isExceedBalance) return 'amount-input error';
        if (isValidSuccess) return 'amount-input success';
        return 'amount-input';
    };

    return (
        <div className="amount-input-wrapper">

            <div className="title-area">
                <h1 className="main-title">
                    얼마를 보낼까요?
                </h1>

                <p className="sub-title">
                    {data.myAccount || '출금 계좌'}의 잔액{' '}
                    {formatAmount(balance)}원 중에서 보냅니다
                </p>
            </div>

            {accountError && (
                <p className="message error-message">
                    {accountError}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="amount-form"
            >
                <div className="input-group">

                    <div className="amount-input-container">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={formatAmount(data.amount)}
                            onChange={handleInputChange}
                            className={getInputClassName()}
                            disabled={isLoading}
                        />
                    </div>

                    {/* 최소 금액 미만 */}
                    {isLessThanMin && (
                        <p className="message error-message">
                            최소 이체 금액은 1,000원입니다
                        </p>
                    )}

                    {/* 잔액 초과 */}
                    {isExceedBalance && (
                        <p className="message error-message">
                            잔액을 초과하여 이체할 수 없습니다
                        </p>
                    )}

                    {/* 정상 */}
                    {isValidSuccess && (
                        <p className="message success-message">
                            {formatAmount(data.amount)}원 이체 가능합니다
                        </p>
                    )}

                    {/* 퀵 금액 */}
                    <div className="quick-btn-group">
                        <button
                            type="button"
                            className="quick-btn"
                            onClick={() => handleAddAmount(10000)}
                        >
                            +1만
                        </button>

                        <button
                            type="button"
                            className="quick-btn"
                            onClick={() => handleAddAmount(50000)}
                        >
                            +5만
                        </button>

                        <button
                            type="button"
                            className="quick-btn"
                            onClick={() => handleAddAmount(100000)}
                        >
                            +10만
                        </button>

                        <button
                            type="button"
                            className="quick-btn"
                            onClick={handleResetAmount}
                        >
                            직접입력
                        </button>
                    </div>
                </div>

                <div className="button-area">
                    <button
                        type="submit"
                        className={`btn-next ${
                            isFormValid ? 'active' : ''
                        }`}
                        disabled={!isFormValid}
                    >
                        다음
                    </button>

                    <button
                        type="button"
                        className="btn-prev"
                        onClick={onPrev}
                    >
                        이전으로
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AmountInput;