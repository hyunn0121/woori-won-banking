const RecentTransaction = ({ transactions = [], onMoreClick, onSelectTransaction }) => {
  const recentTransactions = transactions.slice(0, 4);

  return (
    <section className="transaction-section">
      <div className="section-head">
        <h3>최근 거래내역</h3>
        <button type="button" className="more-btn" onClick={onMoreClick}>
          더보기
        </button>
      </div>

      <ul className="transaction-list">
        {recentTransactions.map((item) => {
          const isDeposit = item.type === 'in';
          const title = item.desc || item.title || '거래 내역';
          const formattedAmount = Number(item.amount || 0).toLocaleString();

          return (
            <li 
              key={item.id} 
              className="transaction-item"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectTransaction && onSelectTransaction(item)}
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