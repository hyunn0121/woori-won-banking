const AccountSection = ({ accounts = [], onViewAll, onTransfer, isHide = false }) => {
  return (
    <section className="account-section">
      <div className="section-head">
        <h3>내 계좌</h3>
        <button type="button" className="more-btn" onClick={onViewAll}>
          전체보기
        </button>
      </div>

      <ul className="account-list">
        {accounts.map((account) => (
          <li key={account.id} className="account-card">
            <div className="account-info">
              <span className="account-name">{account.nickname}</span>
              <span className="account-number">{account.accountNo}</span>
            </div>

            <div className="account-body">
              <span className="account-balance">
                {isHide ? '••••••원' : `${Number(account.balance).toLocaleString()}원`}
              </span>

              <button
                type="button"
                className="transfer-btn"
                onClick={() => onTransfer && onTransfer(account)}
              >
                이체
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccountSection;