// src/components/RecentTransaction.jsx

const RecentTransaction = ({ transactions = [] }) => {
  // 최근순으로 상위 4개만 추출 (필요에 따라 개수 조정 가능)
  const recentTransactions = transactions.slice(0, 4);

  return (
    <section className="transaction-section">
      <div className="section-head">
        <h3>최근 거래내역</h3>
        <button type="button" className="more-btn">
          더보기
        </button>
      </div>

      <ul className="transaction-list">
        {recentTransactions.map((item) => {
          const isDeposit = item.type === 'in';
          const title = item.desc || item.title || item.name;
          const formattedAmount = Number(item.amount || 0).toLocaleString();

          return (
            <li key={item.id} className="transaction-item">
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