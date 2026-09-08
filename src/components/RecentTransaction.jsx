const RecentTransaction = ({ transactions = [], onMoreClick }) => {
  const recentTransactions = transactions.slice(0, 4);

  return (
    <section className="transaction-section">
      <div className="section-head">
        <h3>최근 거래내역</h3>
        <button type="button" className="more-btn" onClick={onMoreClick}>
          더보기
        </button>
      </div>
      {/* 이하 기존 동일 */}
    </section>
  );
};

export default RecentTransaction;