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

  // 1. 탭, 계좌 선택, 이체, 자산 숨김 상태 관리
  const [activeTab, setActiveTab] = useState('home');
  const [selectedAccountForHistory, setSelectedAccountForHistory] = useState('전체계좌');
  const [isTransferPageOpen, setIsTransferPageOpen] = useState(false);
  const [isAssetHidden, setIsAssetHidden] = useState(false);

  // 2. 바텀시트 상태 및 선택된 거래 내역
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // 항목 선택 시 거래 데이터 세팅 후 바텀시트 오픈 (팀원 코드의 onOpenSheet 대응 포함)
  const handleOpenSheetWithData = (transactionItem) => {
    if (transactionItem && typeof transactionItem === 'object') {
      setSelectedTransaction(transactionItem);
    }
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedTransaction(null);
  };

  // 거래내역 이동 전용 함수
  const handleGoToHistory = (accountName = '전체계좌') => {
    setSelectedAccountForHistory(accountName);
    setActiveTab('history');
  };

  // 이체 페이지 오픈/클로즈 (팀원 코드 연동)
  const handleOpenTransfer = () => {
    setIsTransferPageOpen(true);
  };

  const handleCloseTransfer = () => {
    setIsTransferPageOpen(false);
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
      storeName: tx.desc || tx.title || tx.name || '거래 내역',
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
          /* 홈 또는 거래내역 탭 화면 영역 */
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
                  initialAccount={selectedAccountForHistory}
                  selectedAccount={selectedAccountForHistory} 
                  onSelectTransaction={handleOpenSheetWithData}
                  onOpenSheet={handleOpenSheetWithData} 
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
                    onOpenSheet={handleOpenSheetWithData} 
                    onViewAll={() => handleGoToHistory('전체계좌')}
                    onSelectAccount={(accName) => handleGoToHistory(accName)}
                    onTransfer={handleOpenTransfer}
                  />

                  <RecentTransaction 
                    transactions={transactions} 
                    onMoreClick={() => handleGoToHistory('전체계좌')}
                    onSelectTransaction={handleOpenSheetWithData}
                    onOpenSheet={handleOpenSheetWithData} 
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
              data={formatTransactionForSheet(selectedTransaction)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;