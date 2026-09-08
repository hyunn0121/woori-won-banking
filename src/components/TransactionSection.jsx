import { useState, useEffect } from 'react';
import { AccountFilter } from './AccountFilter';
import { InOutFilter } from './InOutFilter';
import { DailyTransactionGroup } from './DailyTransactionGroup';

const ACCOUNT_LIST = ['전체계좌', '우리 첫급여통장', '우리 SUPER주거래통장'];

export const TransactionSection = ({ initialAccount = '전체계좌', onSelectTransaction }) => {
  const [selectedAccount, setSelectedAccount] = useState(initialAccount);
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch('http://localhost:4000/api/transactions');

        if (!response.ok) {
          throw new Error(`서버 응답 오류 (HTTP ${response.status})`);
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error('API 페칭 실패:', err);
        setErrorMessage('거래내역을 불러오지 못했습니다. 서버 상태를 확인해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // 필터링 처리
  const filteredTransactions = transactions.filter((tx) => {
    const matchAccount =
      selectedAccount === '전체계좌' ||
      (selectedAccount === '우리 첫급여통장' && tx.accountId === 'acc1') ||
      (selectedAccount === '우리 SUPER주거래통장' && tx.accountId === 'acc2');

    const matchType =
      selectedFilter === 'ALL' ||
      (selectedFilter === 'IN' && tx.type === 'in') ||
      (selectedFilter === 'OUT' && tx.type === 'out');

    return matchAccount && matchType;
  });

  const groupedDates = Array.from(new Set(filteredTransactions.map((tx) => tx.date)));

  return (
    <div style={{ width: '100%', background: '#ffffff' }}>
      {/* 1) 계좌 필터 */}
      <AccountFilter
        accounts={ACCOUNT_LIST}
        selectedAccount={selectedAccount}
        onChangeAccount={setSelectedAccount}
      />

      {/* 2) 입출금 필터 */}
      <InOutFilter
        selectedFilter={selectedFilter}
        onChangeFilter={setSelectedFilter}
      />

      {/* 3) 상태별 화면 처리 */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#005BAC', fontSize: '14px', fontWeight: 'bold' }}>
          ⏳ 거래내역을 불러오는 중입니다...
        </div>
      ) : errorMessage ? (
        <div style={{ textAlign: 'center', padding: '40px 16px', color: '#fa5252', fontSize: '13px' }}>
          ⚠️ {errorMessage}
        </div>
      ) : groupedDates.length > 0 ? (
        groupedDates.map((date) => {
          const dailyList = filteredTransactions.filter((tx) => tx.date === date);
          return (
            <DailyTransactionGroup
              key={date}
              date={date}
              transactions={dailyList}
              onSelectTransaction={onSelectTransaction}
            />
          );
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#adb5bd', fontSize: '14px' }}>
          해당 조건의 거래 내역이 없습니다.
        </div>
      )}
    </div>
  );
};