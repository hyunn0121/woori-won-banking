export const AccountFilter = ({ accounts, selectedAccount, onChangeAccount }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
      {accounts.map((acc) => {
        const isSelected = selectedAccount === acc;
        return (
          <button
            key={acc}
            onClick={() => onChangeAccount(acc)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: isSelected ? '#005BAC' : '#f0f2f5',
              color: isSelected ? '#ffffff' : '#444444',
              fontWeight: isSelected ? '600' : 'normal',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {acc}
          </button>
        );
      })}
    </div>
  );
};