import React from 'react';
import './AccountInput.css';

const AccountInput = ({ data, updateData, onNext }) => {
    // 계좌번호가 8자리 이상 입력되었을 때만 '다음' 버튼 활성화
    const isFormValid = data.accountNumber.length >= 10;

    // 계좌번호 입력 시 숫자만 남기도록 처리
    const handleAccountNumberChange = (e) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        updateData({ accountNumber: onlyNumbers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onNext();
        }
    };

    return (
        <div className="account-input-wrapper">
            {/* 타이틀 영역 */}
            <div className="title-area">
                <h1 className="main-title">누구에게 보낼까요?</h1>
                <p className="sub-title">출금 계좌와 받는 분의 계좌 정보를 입력해주세요</p>
            </div>

            <form onSubmit={handleSubmit} className="account-form">
                {/* 1. 출금 계좌 */}
                <div className="input-group">
                    <label className="input-label">출금 계좌</label>
                    <div className="select-wrapper">
                        <select
                            value={data.myAccount}
                            onChange={(e) => updateData({ myAccount: e.target.value })}
                            className="custom-select"
                        >
                            <option value="우리 첫급여통장 (2,294,560원)">
                                우리 첫급여통장 (2,294,560원)
                            </option>
                            <option value="우리 WON 통장 (1,000,000원)">
                                우리 WON 통장 (1,000,000원)
                            </option>
                        </select>
                    </div>
                </div>

                {/* 2. 받는 은행 */}
                <div className="input-group">
                    <label className="input-label">받는 은행</label>
                    <div className="select-wrapper">
                        <select
                            value={data.bank}
                            onChange={(e) => updateData({ bank: e.target.value })}
                            className="custom-select"
                        >
                            <option value="국민은행">국민은행</option>
                            <option value="우리은행">우리은행</option>
                            <option value="신한은행">신한은행</option>
                            <option value="카카오뱅크">카카오뱅크</option>
                            <option value="농협은행">농협은행</option>
                        </select>
                    </div>
                </div>

                {/* 3. 계좌번호 */}
                <div className="input-group">
                    <label className="input-label">계좌번호</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="- 없이 숫자만 입력 (예: 1002123456789)"
                        value={data.accountNumber}
                        onChange={handleAccountNumberChange}
                        className="custom-input"
                    />

                    {/* 10자리 이상 입력 시 예금주 확인 배지 표시 */}
                    {data.accountNumber.length >= 10 && (
                        <div className="verified-badge">
                            ✓ 예금주 홍길동 님 확인됨
                        </div>
                    )}
                </div>

                {/* 하단 버튼 */}
                <div className="button-area">
                    <button
                        type="submit"
                        className={`btn-next ${isFormValid ? 'active' : ''}`}
                        disabled={!isFormValid}
                    >
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountInput;