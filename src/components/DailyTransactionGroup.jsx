import { TransactionItem } from './TransactionItem';

export const DailyTransactionGroup = ({ date, transactions, onSelectTransaction }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#495057',
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        }}
      >
        {date}
      </div>
      <div>
        {transactions.map((tx) => (
          <TransactionItem 
            key={tx.id} 
            transaction={tx} 
            onClick={onSelectTransaction}
          />
        ))}
      </div>
    </div>
  );
};