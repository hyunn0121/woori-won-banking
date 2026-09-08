import { useState, useEffect } from 'react';
import { checkHealth, fetchAccounts, fetchTransactions } from './api/banking';

import Header from './components/Header';
import TotalAssetCard from './components/TotalAssetCard';
import QuickMenu from './components/QuickMenu';
import AccountSection from './components/AccountSection';
import RecentTransaction from './components/RecentTransaction';
import BottomNav from './components/BottomNav';
import TransactionDetailBottomSheet from './components/TransactionBottomSheet/TransactionBottomSheet';
import TransferPage from './components/Transfer/TransferPage';
import { TransactionSection } from './components/TransactionSection';

import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isTransferPageOpen, setIsTransferPageOpen] = useState(false);
  const [isAssetHidden, setIsAssetHidden] = useState(false);

  // 1. 현재 탭 및 거래내역 화면용 선택 계좌 상태
  const [activeTab, setActiveTab] = useState('home');
  const [selectedAccountForHistory, setSelectedAccountForHistory] = useState('전체계좌');

  const handleOpenSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 2. 거래내역 화면으로 이동하는 전용 함수
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
        
        setAccounts(accountData);
        setTransactions(transactionData);
      } catch (error) {
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

  const handleOpenTransfer = () => {
    setIsTransferPageOpen(true);
  };

  const handleCloseTransfer = () => {
    setIsTransferPageOpen(false);
  };

  return (
    <div className="app">
      <div className="phone-frame">
        {/* 이체 페이지가 열렸을 때 */}
        {isTransferPageOpen ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <Header />

            <div style={{ flex: 1, overflowY: 'auto' }}>
              <TransferPage onPageClose={handleCloseTransfer} />
            </div>
            
            <BottomNav 
              onOpenTransfer={handleOpenTransfer} 
              onGoHome={handleCloseTransfer} 
              currentTab="이체" 
            />
          </div>
        ) : (
          /* 홈 또는 기타 탭 화면 영역 */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <Header />

            <main className="content-body" style={{ flex: 1, overflowY: 'auto' }}>
              {hasError ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#64748b', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>서비스 연결을 확인할 수 없습니다</p>
                  <p style={{ fontSize: '13px' }}>네트워크 상태가 불안정하거나<br />서버 점검 중입니다.</p>
                </div>
              ) : activeTab === 'history' ? (
                /* 거래내역 탭 화면 */
                <TransactionSection 
                  transactions={transactions} 
                  selectedAccount={selectedAccountForHistory} 
                  onOpenSheet={handleOpenSheet} 
                />
              ) : (
                /* 기본 홈 화면 */
                <>
                  <p className="greeting-hi">안녕하세요 👋</p>
                  <p className="greeting-name">김민준님</p>

                  <TotalAssetCard 
                    accounts={accounts} 
                    hasError={hasError} 
                    isHide={isAssetHidden}
                    onToggleHide={() => setIsAssetHidden(!isAssetHidden)}
                  />

                  <QuickMenu 
                    onGoToHistory={() => handleGoToHistory('전체계좌')}
                    onOpenTransfer={handleOpenTransfer}
                  />

                  <AccountSection 
                    accounts={accounts} 
                    onOpenSheet={handleOpenSheet} 
                    onViewAll={() => handleGoToHistory('전체계좌')}
                    onSelectAccount={(accName) => handleGoToHistory(accName)}
                    onTransfer={handleOpenTransfer}
                  />

                  <RecentTransaction 
                    transactions={transactions} 
                    onOpenSheet={handleOpenSheet} 
                  />
                </>
              )}
            </main>

            <BottomNav 
              activeTab={activeTab}
              onOpenTransfer={handleOpenTransfer}
              onGoHome={() => setActiveTab('home')}
              onChangeTab={(tab) => {
                if (tab === '거래내역') handleGoToHistory('전체계좌');
                else if (tab === '홈') setActiveTab('home');
              }} 
            />

            <TransactionDetailBottomSheet 
              isOpen={isBottomSheetOpen} 
              onClose={handleCloseSheet} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;