export const InOutFilter = ({ selectedFilter, onChangeFilter }) => {
  const filterOptions = [
    { label: '전체', value: 'ALL' },
    { label: '입금', value: 'IN' },
    { label: '출금', value: 'OUT' }
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', padding: '12px 16px' }}>
      {filterOptions.map((opt) => {
        const isSelected = selectedFilter === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChangeFilter(opt.value)}
            style={{
              padding: '5px 12px',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: isSelected ? '#005BAC' : '#f0f2f5',
              color: isSelected ? '#ffffff' : '#666666',
              fontWeight: isSelected ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};