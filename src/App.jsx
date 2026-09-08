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

import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isTransferPageOpen, setIsTransferPageOpen] = useState(false);
  const [isAssetHidden, setIsAssetHidden] = useState(false);

  const handleOpenSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
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
          <>
            <Header />

            <main className="content-body">
              {hasError ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#64748b', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>서비스 연결을 확인할 수 없습니다</p>
                  <p style={{ fontSize: '13px' }}>네트워크 상태가 불안정하거나<br />서버 점검 중입니다.</p>
                </div>
              ) : (
                <>
                  <p className="greeting-hi">안녕하세요 👋</p>
                  <p className="greeting-name">김민준님</p>

                  <TotalAssetCard 
                    accounts={accounts} 
                    hasError={hasError} 
                    isHide={isAssetHidden}
                    onToggleHide={() => setIsAssetHidden(!isAssetHidden)}
                  />

                  <QuickMenu onOpenTransfer={handleOpenTransfer} />

                  <AccountSection 
                    accounts={accounts} 
                    onOpenSheet={handleOpenSheet} 
                    onTransfer={handleOpenTransfer} 
                    isHide={isAssetHidden}
                  />

                  {/* 💡 최근 거래 컴포넌트에 모달 오픈 함수 전달 */}
                  <RecentTransaction 
                    transactions={transactions} 
                    onOpenSheet={handleOpenSheet} 
                  />
                </>
              )}
            </main>

            <BottomNav 
              onOpenTransfer={handleOpenTransfer} 
              onGoHome={handleCloseTransfer} 
              currentTab="홈" 
            />

            {/* 💡 거래 상세 바텀시트(모달) 컴포넌트 */}
            <TransactionDetailBottomSheet 
              isOpen={isBottomSheetOpen} 
              onClose={handleCloseSheet} 
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;