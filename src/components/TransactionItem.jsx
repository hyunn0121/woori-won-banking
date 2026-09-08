const ACCOUNT_NAMES = {
  acc1: '우리 첫급여통장',
  acc2: '우리 SUPER주거래통장',
  acc3: '우리 WON 적금'
};

export const TransactionItem = ({ transaction, onClick }) => {
  const isDeposit = transaction.type === 'in';
  const isDone = transaction.status === 'done';
  const displayName = ACCOUNT_NAMES[transaction.accountId] || transaction.accountName || transaction.accountId;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        borderBottom: '1px solid #f0f2f5',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        gap: '12px'
      }}
      onClick={() => onClick && onClick(transaction)}
    >
      {/* 1. 좌측 아이콘 */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: isDeposit ? '#e8f3ff' : '#f1f3f5',
          color: isDeposit ? '#005BAC' : '#495057',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          fontWeight: 'bold',
          flexShrink: 0
        }}
      >
        {isDeposit ? '↓' : '↑'}
      </div>

      {/* 2. 중앙 내용 (말줄임 적용 및 겹침 방지) */}
      <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
        <div 
          style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            color: '#212529', 
            marginBottom: '3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {transaction.desc}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#868e96',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {transaction.time} · {displayName}
          </span>
          <span
            style={{
              padding: '1px 6px',
              borderRadius: '4px',
              backgroundColor: isDone ? '#e6fcf5' : '#fff9db',
              color: isDone ? '#0ca678' : '#f59f00',
              fontSize: '11px',
              fontWeight: '600',
              flexShrink: 0
            }}
          >
            {isDone ? '완료' : '처리중'}
          </span>
        </div>
      </div>

      {/* 3. 우측 금액 및 잔액 */}
      <div style={{ textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap' }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: '700',
            color: isDeposit ? '#005BAC' : '#212529',
            marginBottom: '3px'
          }}
        >
          {isDeposit ? `+${transaction.amount.toLocaleString()}` : `-${transaction.amount.toLocaleString()}`}원
        </div>
        <div style={{ fontSize: '12px', color: '#868e96' }}>
          잔액 {transaction.balanceAfter.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};