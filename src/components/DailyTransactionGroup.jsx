import { TransactionItem } from './TransactionItem';

export const DailyTransactionGroup = ({ date, transactions }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {/* 날짜 헤더 라벨 */}
      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#495057', padding: '8px 16px', backgroundColor: '#f8f9fa' }}>
        {date}
      </div>

      {/* 개별 거래 렌더링 (고유한 id를 key로 사용) */}
      <div>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};