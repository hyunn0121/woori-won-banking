import { useState, useEffect } from 'react';
import { checkHealth, fetchAccounts, fetchTransactions } from './api/banking';

import Header from './components/Header';
import TotalAssetCard from './components/TotalAssetCard';
import QuickMenu from './components/QuickMenu';
import AccountSection from './components/AccountSection';
import RecentTransaction from './components/RecentTransaction';
import BottomNav from './components/BottomNav';
import TransactionDetailBottomSheet from './components/TransactionBottomSheet/TransactionBottomSheet';
import { TransactionSection } from './components/TransactionSection';

import './App.css';

// 계좌 ID 매핑 사전
const ACCOUNT_NAMES = {
  acc1: '우리 첫급여통장',
  acc2: '우리 SUPER주거래통장',
  acc3: '우리 WON 적금'
};

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedAccountForHistory, setSelectedAccountForHistory] = useState('전체계좌');

  // 바텀시트 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleOpenSheetWithData = (transactionItem) => {
    setSelectedTransaction(transactionItem);
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedTransaction(null);
  };

  const handleGoToHistory = (accountName = '전체계좌') => {
    setSelectedAccountForHistory(accountName);
    setActiveTab('history');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setHasError(false);
        await checkHealth();

        const [accountData, transactionData] = await Promise.all([
          fetchAccounts(),
          fetchTransactions(),
        ]);
        
        setAccounts(accountData || []);
        setTransactions(transactionData || []);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e2e8f0' }}>
        로딩 중...
      </div>
    );
  }

  // 바텀시트로 넘겨줄 데이터 변환 (계좌 ID -> 한글 이름 반영)
  const formatTransactionForSheet = (tx) => {
    if (!tx) return null;
    const isDeposit = tx.type === 'in';
    const amountStr = `${isDeposit ? '+' : '-'}${Number(tx.amount || 0).toLocaleString()}`;
    const accountDisplayName = ACCOUNT_NAMES[tx.accountId] || tx.accountName || tx.accountId || '우리 첫급여통장';

    return {
      storeName: tx.desc || tx.title || '거래 내역',
      amount: amountStr,
      date: `${tx.date || ''} ${tx.time || ''}`,
      account: accountDisplayName,
      balance: Number(tx.balanceAfter || tx.balance || 0).toLocaleString(),
      status: tx.status === 'done' || tx.status === '완료' ? '완료' : '처리중'
    };
  };

  return (
    <div className="app">
      <div className="phone-frame">
        <Header />

        <main className="content-body" style={{ overflowY: 'auto' }}>
          {hasError ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#64748b', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>서비스 연결을 확인할 수 없습니다</p>
              <p style={{ fontSize: '13px' }}>네트워크 상태가 불안정하거나<br />서버 점검 중입니다.</p>
            </div>
          ) : activeTab === 'history' ? (
            <TransactionSection 
              initialAccount={selectedAccountForHistory} 
              onSelectTransaction={handleOpenSheetWithData}
            />
          ) : (
            <>
              <p className="greeting-hi">안녕하세요 👋</p>
              <p className="greeting-name">김민준님</p>

              <TotalAssetCard accounts={accounts} hasError={hasError} />
              
              <QuickMenu 
                onGoToHistory={() => handleGoToHistory('전체계좌')}
              />
              
              <AccountSection 
                accounts={accounts} 
                onViewAll={() => handleGoToHistory('전체계좌')}
                onSelectAccount={(accName) => handleGoToHistory(accName)}
              />
              
              <RecentTransaction 
                transactions={transactions} 
                onMoreClick={() => handleGoToHistory('전체계좌')}
                onSelectTransaction={handleOpenSheetWithData}
              />
            </>
          )}
        </main>

        <BottomNav 
          activeTab={activeTab} 
          onChangeTab={(tab) => {
            if (tab === '거래내역') handleGoToHistory('전체계좌');
            else if (tab === '홈') setActiveTab('home');
          }} 
        />

        <TransactionDetailBottomSheet 
          isOpen={isBottomSheetOpen} 
          onClose={handleCloseSheet} 
          data={formatTransactionForSheet(selectedTransaction)}
        />
      </div>
    </div>
  );
}

export default App;