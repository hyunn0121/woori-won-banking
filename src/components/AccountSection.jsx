const AccountSection = ({ accounts = [], onViewAll, onTransfer, onSelectAccount }) => {
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
            {/* 통장 정보(이름, 번호) 영역을 누르면 거래내역으로 이동 */}
            <div 
              className="account-info" 
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectAccount && onSelectAccount(account.nickname)}
            >
              <span className="account-name">{account.nickname}</span>
              <span className="account-number">{account.accountNo}</span>
            </div>

            <div className="account-body">
              <span className="account-balance">
                {Number(account.balance).toLocaleString()}원
              </span>
              
              {/* 원래 원본 상태 코드 그대로 유지 (이체 연동 안 함) */}
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