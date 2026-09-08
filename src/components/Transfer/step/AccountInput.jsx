import React, { useEffect, useState } from 'react';
import './AccountInput.css';

const AccountInput = ({ data, updateData, onNext }) => {
    const [accounts, setAccounts] = useState([]);
    const [isAccountsLoading, setIsAccountsLoading] = useState(false);

    const [isLookupLoading, setIsLookupLoading] = useState(false);
    const [lookupError, setLookupError] = useState('');

    // --------------------------------
    // 1. 내 출금 계좌 목록 조회
    // --------------------------------
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setIsAccountsLoading(true);

                const response = await fetch('/api/accounts');

                if (!response.ok) {
                    throw new Error('계좌 목록을 불러오지 못했습니다.');
                }

                const result = await response.json();

                setAccounts(result);

                // 아직 출금 계좌가 선택되지 않았다면 첫 번째 계좌 선택
                if (result.length > 0 && !data.fromAccountId) {
                    updateData({
                        fromAccountId: result[0].id,
                        myAccount: result[0].nickname,
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsAccountsLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    // --------------------------------
    // 2. 받는 계좌번호 입력
    // --------------------------------
    const handleAccountNumberChange = (e) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');

        updateData({
            accountNumber: onlyNumbers,
            receiver: '',
        });

        // 기존 조회 에러 제거
        setLookupError('');
    };

    // --------------------------------
    // 3. 예금주 조회
    // --------------------------------
    useEffect(() => {
        // 계좌번호가 10자리 미만이면 조회하지 않음
        if (data.accountNumber.length < 10) {
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setIsLookupLoading(true);
                setLookupError('');

                const response = await fetch(
                    `/api/transfer/lookup?bank=${encodeURIComponent(data.bank)}&accountNo=${data.accountNumber}`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message);
                }

                // 서버에서 받은 예금주 정보를 저장
                updateData({
                    receiver: result.ownerName,
                });

            } catch (error) {
                // 예금주 조회 실패
                setLookupError(error.message);

                // 이전에 저장되어 있던 예금주 정보 제거
                updateData({
                    receiver: '',
                });

            } finally {
                setIsLookupLoading(false);
            }
        }, 400);

        // 계좌번호가 다시 입력되면 이전 타이머 취소
        return () => clearTimeout(timer);
    }, [data.accountNumber, data.bank]);

    // --------------------------------
    // 4. 다음 버튼 활성화 조건
    // --------------------------------
    const isFormValid =
        data.accountNumber.length >= 10 &&
        !!data.receiver &&
        !isLookupLoading;

    // --------------------------------
    // 5. 다음 버튼
    // --------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            onNext();
        }
    };

    return (
        <div className="account-input-wrapper">
            <div className="title-area">
                <h1 className="main-title">누구에게 보낼까요?</h1>
                <p className="sub-title">
                    출금 계좌와 받는 분의 계좌 정보를 입력해주세요
                </p>
            </div>

            <form onSubmit={handleSubmit} className="account-form">

                {/* 1. 출금 계좌 */}
                <div className="input-group">
                    <label className="input-label">
                        출금 계좌
                    </label>

                    <div className="select-wrapper">
                        <select
                            value={data.fromAccountId}
                            onChange={(e) => {
                                const selectedAccount = accounts.find(
                                    (account) =>
                                        account.id === e.target.value
                                );

                                if (!selectedAccount) return;

                                updateData({
                                    fromAccountId: selectedAccount.id,
                                    myAccount: selectedAccount.nickname,
                                });
                            }}
                            className="custom-select"
                            disabled={isAccountsLoading}
                        >
                            {accounts.map((account) => (
                                <option
                                    key={account.id}
                                    value={account.id}
                                >
                                    {account.nickname} (
                                    {account.balance.toLocaleString()}
                                    원)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 2. 받는 은행 */}
                <div className="input-group">
                    <label className="input-label">
                        받는 은행
                    </label>

                    <div className="select-wrapper">
                        <select
                            value={data.bank}
                            onChange={(e) => {
                                updateData({
                                    bank: e.target.value,
                                    receiver: '',
                                });

                                setLookupError('');
                            }}
                            className="custom-select"
                        >
                            <option value="국민은행">
                                국민은행
                            </option>
                            <option value="우리은행">
                                우리은행
                            </option>
                            <option value="신한은행">
                                신한은행
                            </option>
                            <option value="카카오뱅크">
                                카카오뱅크
                            </option>
                            <option value="농협은행">
                                농협은행
                            </option>
                        </select>
                    </div>
                </div>

                {/* 3. 받는 계좌번호 */}
                <div className="input-group">
                    <label className="input-label">
                        계좌번호
                    </label>

                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="- 없이 숫자만 입력 (예: 1002123456789)"
                        value={data.accountNumber}
                        onChange={handleAccountNumberChange}
                        className="custom-input"
                    />

                    {/* 예금주 조회 중 */}
                    {isLookupLoading && (
                        <div className="lookup-message">
                            예금주를 확인하고 있습니다...
                        </div>
                    )}

                    {/* 예금주 조회 성공 */}
                    {data.receiver && !isLookupLoading && (
                        <div className="verified-badge">
                            ✓ 예금주 {data.receiver} 님 확인됨
                        </div>
                    )}

                    {/* 예금주 조회 실패 */}
                    {lookupError && (
                        <div className="lookup-error">
                            {lookupError}
                        </div>
                    )}
                </div>

                {/* 다음 버튼 */}
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
                </div>

            </form>
        </div>
    );
};

export default AccountInput;