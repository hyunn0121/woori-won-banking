import { useState } from 'react';
import { AccountFilter } from './AccountFilter';
import { InOutFilter } from './InOutFilter';
import { DailyTransactionGroup } from './DailyTransactionGroup';

// 화면 목업 데이터
const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', date: '2026-08-23', time: '09:12', title: '스타벅스 강남점', accountName: '우리 첫급여통장', type: 'OUT', amount: 5800, balance: 2384560, status: '완료' },
  { id: 'tx-2', date: '2026-08-22', time: '18:40', title: '월급', accountName: '우리 첫급여통장', type: 'IN', amount: 3200000, balance: 2390360, status: '완료' },
  { id: 'tx-3', date: '2026-08-22', time: '12:05', title: '이서연', accountName: '우리 첫급여통장', type: 'OUT', amount: 30000, balance: 809640, status: '완료' },
  { id: 'tx-4', date: '2026-08-21', time: '10:00', title: '자동이체 - 적금', accountName: '우리 SUPER주거래통장', type: 'OUT', amount: 500000, balance: 15200000, status: '완료' },
  { id: 'tx-5', date: '2026-08-20', time: '20:15', title: '배달의민족', accountName: '우리 첫급여통장', type: 'OUT', amount: 18900, balance: 15839640, status: '처리중' }
];

const ACCOUNT_LIST = ['전체계좌', '우리 첫급여통장', '우리 SUPER주거래통장'];

export const TransactionSection = () => {
  // 3단계에서 정의한 상태(State) 선언
  const [selectedAccount, setSelectedAccount] = useState('전체계좌');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [transactions] = useState(INITIAL_TRANSACTIONS);

  // 1. 선택된 계좌 및 입출금 타입에 따라 필터링
  const filteredTransactions = transactions.filter((tx) => {
    const matchAccount = selectedAccount === '전체계좌' || tx.accountName === selectedAccount;
    const matchType = selectedFilter === 'ALL' || tx.type === selectedFilter;
    return matchAccount && matchType;
  });

  // 2. 날짜별로 데이터 그룹화
  const groupedDates = Array.from(new Set(filteredTransactions.map((tx) => tx.date)));

  return (
    // maxWidth와 중복 border를 제거하고 부모 너비(width: 100%)에 맞춥니다.
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

      {/* 3) 날짜별 그룹 목록 렌더링 */}
      {groupedDates.length > 0 ? (
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