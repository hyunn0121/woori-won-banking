// src/components/AccountSection.jsx

const AccountSection = ({ 
  accounts = [], 
  onViewAll, 
  onTransfer, 
  onSelectAccount, 
  isHide = false 
}) => {
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
            {/* 통장 정보(이름, 번호) 영역 클릭 시 거래내역으로 이동 */}
            <div 
              className="account-info" 
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectAccount && onSelectAccount(account.nickname)}
            >
              <span className="account-name">{account.nickname}</span>
              <span className="account-number">{account.accountNo}</span>
            </div>

            <div className="account-body">
              {/* isHide 상태에 따른 금액 마스킹 처리 */}
              <span className="account-balance">
                {isHide ? '••••••원' : `${Number(account.balance || 0).toLocaleString()}원`}
              </span>

              {/* 이체 버튼 연동 */}
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