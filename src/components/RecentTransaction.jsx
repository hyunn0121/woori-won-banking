// src/components/RecentTransaction.jsx

const RecentTransaction = ({ transactions = [], onMoreClick, onSelectTransaction, onOpenSheet }) => {
  const recentTransactions = transactions.slice(0, 4);

  // 클릭 시 팀원 코드(onOpenSheet)와 내 코드(onSelectTransaction)를 모두 대응할 수 있도록 처리
  const handleItemClick = (item) => {
    if (onSelectTransaction) {
      onSelectTransaction(item);
    } else if (onOpenSheet) {
      onOpenSheet(item);
    }
  };

  return (
    <section className="transaction-section">
      <div className="section-head">
        <h3>최근 거래내역</h3>
        {/* '더보기' 버튼 클릭 시 거래내역 화면으로 이동 */}
        <button type="button" className="more-btn" onClick={onMoreClick}>
          더보기
        </button>
      </div>

      <ul className="transaction-list">
        {recentTransactions.map((item) => {
          const isDeposit = item.type === 'in';
          const title = item.desc || item.title || item.name || '거래 내역';
          const formattedAmount = Number(item.amount || 0).toLocaleString();

          return (
            <li 
              key={item.id} 
              className="transaction-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleItemClick(item)} 
            >
              <div className="tx-info">
                <span className="tx-title">{title}</span>
                <span className="tx-date">{item.date}</span>
              </div>

              <div className="tx-amount-wrap">
                <span className={`amount ${isDeposit ? 'plus' : 'minus'}`}>
                  {isDeposit ? `+${formattedAmount}` : `-${formattedAmount}`}원
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RecentTransaction;