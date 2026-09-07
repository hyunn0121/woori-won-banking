export const TransactionItem = ({ transaction }) => {
  const isDeposit = transaction.type === 'IN';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        borderBottom: '1px solid #f0f2f5',
        backgroundColor: '#ffffff'
      }}
    >
      {/* 1. 좌측 입출금 화살표 아이콘 */}
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
          flexShrink: 0,
          marginRight: '12px'
        }}
      >
        {isDeposit ? '↓' : '↑'}
      </div>

      {/* 2. 중앙 텍스트 영역 (왼쪽 정렬 및 한 줄 유지) */}
      <div
        style={{
          flex: 1,
          textAlign: 'left',
          minWidth: 0
        }}
      >
        <div
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#212529',
            marginBottom: '3px'
          }}
        >
          {transaction.title}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#868e96',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>
            {transaction.time} · {transaction.accountName}
          </span>
          <span
            style={{
              padding: '1px 6px',
              borderRadius: '4px',
              backgroundColor: transaction.status === '완료' ? '#e6fcf5' : '#fff9db',
              color: transaction.status === '완료' ? '#0ca678' : '#f59f00',
              fontSize: '11px',
              fontWeight: '600',
              flexShrink: 0
            }}
          >
            {transaction.status}
          </span>
        </div>
      </div>

      {/* 3. 우측 금액 및 잔액 영역 (줄바꿈 방지) */}
      <div
        style={{
          textAlign: 'right',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          paddingLeft: '12px'
        }}
      >
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
        <div
          style={{
            fontSize: '12px',
            color: '#868e96'
          }}
        >
          잔액 {transaction.balance.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};