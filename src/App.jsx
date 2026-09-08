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

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 1. 현재 탭 및 거래내역 화면용 선택 계좌 상태만 관리
  const [activeTab, setActiveTab] = useState('home');
  const [selectedAccountForHistory, setSelectedAccountForHistory] = useState('전체계좌');

  // 바텀시트 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleOpenSheet = () => setIsBottomSheetOpen(true);
  const handleCloseSheet = () => setIsBottomSheetOpen(false);

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

  return (
    <div className="app">
      <div className="phone-frame">
        {/* 1. 최상단 고정 헤더 */}
        <Header />

        {/* 2. 중앙 컨텐츠 영역 */}
        <main className="content-body">
          {hasError ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#64748b', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>서비스 연결을 확인할 수 없습니다</p>
              <p style={{ fontSize: '13px' }}>네트워크 상태가 불안정하거나<br />서버 점검 중입니다.</p>
            </div>
          ) : activeTab === 'history' ? (
            /* 거래내역 탭일 때 나의 거래내역 화면 출력 */
            <TransactionSection initialAccount={selectedAccountForHistory} />
          ) : (
            /* 홈 탭일 때 기본 홈 화면 출력 */
            <>
              <p className="greeting-hi">안녕하세요 👋</p>
              <p className="greeting-name">김민준님</p>

              <TotalAssetCard accounts={accounts} hasError={hasError} />
              
              <QuickMenu 
                onGoToHistory={() => handleGoToHistory('전체계좌')}
              />
              
              <AccountSection 
                accounts={accounts} 
                onOpenSheet={handleOpenSheet}
                onViewAll={() => handleGoToHistory('전체계좌')}
                onSelectAccount={(accName) => handleGoToHistory(accName)}
              />
              
              <RecentTransaction 
                transactions={transactions} 
                onMoreClick={() => handleGoToHistory('전체계좌')}
              />
            </>
          )}
        </main>

        {/* 3. 하단 네비게이션 */}
        <BottomNav 
          activeTab={activeTab} 
          onChangeTab={(tab) => {
            if (tab === '거래내역') handleGoToHistory('전체계좌');
            else if (tab === '홈') setActiveTab('home');
          }} 
        />

        {/* 4. 바텀시트 */}
        <TransactionDetailBottomSheet 
          isOpen={isBottomSheetOpen} 
          onClose={handleCloseSheet} 
        />
      </div>
    </div>
  );
}

export default App;