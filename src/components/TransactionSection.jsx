import { useState, useEffect } from 'react';
import { AccountFilter } from './AccountFilter';
import { InOutFilter } from './InOutFilter';
import { DailyTransactionGroup } from './DailyTransactionGroup';

const ACCOUNT_LIST = ['전체계좌', '우리 첫급여통장', '우리 SUPER주거래통장'];

export const TransactionSection = () => {
  const [selectedAccount, setSelectedAccount] = useState('전체계좌');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // API 연동을 위한 3가지 필수 상태
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // 화면이 켜지거나 필터가 변경될 때 API 호출
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        // Express 백엔드 서버 URL (4000 포트)
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
  }, []); // 마운트 시 1회 실행

  // 필터링 계산 (클라이언트 단 필터링)
  const filteredTransactions = transactions.filter((tx) => {
    // 계좌 필터 매핑 (추후 계좌 id 연동 시 tx.accountId와 매핑)
    const matchAccount =
      selectedAccount === '전체계좌' ||
      (selectedAccount === '우리 첫급여통장' && tx.accountId === 'acc1') ||
      (selectedAccount === '우리 SUPER주거래통장' && tx.accountId === 'acc2');

    // 입출금 필터 (소문자 in, out 비교)
    const matchType =
      selectedFilter === 'ALL' ||
      (selectedFilter === 'IN' && tx.type === 'in') ||
      (selectedFilter === 'OUT' && tx.type === 'out');

    return matchAccount && matchType;
  });

  // 날짜별 그룹 키 추출
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

      {/* 3) 화면 상태 분기 처리 */}
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