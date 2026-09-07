// src/App.jsx
import { useState, useEffect } from 'react';
import { checkHealth, fetchAccounts, fetchTransactions } from './api/banking';

import Header from './components/Header';
import TotalAssetCard from './components/TotalAssetCard';
import QuickMenu from './components/QuickMenu';
import AccountSection from './components/AccountSection';
import RecentTransaction from './components/RecentTransaction';
import BottomNav from './components/BottomNav';
import TransactionDetailBottomSheet from './components/TransactionBottomSheet/TransactionBottomSheet';

import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // 서버 에러 상태 관리

  // 바텀시트 열림/닫힘 상태 관리
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 서버에서 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        setHasError(false);
        
        // 1. 서버 연결 상태 확인 (/health 연동)
        await checkHealth();

        // 2. 계좌 및 거래내역 데이터 병렬 조회
        const [accountData, transactionData] = await Promise.all([
          fetchAccounts(),
          fetchTransactions(),
        ]);
        
        setAccounts(accountData);
        setTransactions(transactionData);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        setHasError(true); // 에러 발생 시 플래그 설정
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
    <div className="phone-frame">
      {/* 1. 최상단 고정 헤더 */}
      <Header />

      {/* 2. 스크롤되는 중앙 메인 컨텐츠 */}
      <main className="content-body">
        {hasError ? (
          // 서버 에러(오프라인) 시 민감한 정보 대신 보여줄 안전한 대체 화면
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#64748b', textAlign: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>서비스 연결을 확인할 수 없습니다</p>
            <p style={{ fontSize: '13px' }}>네트워크 상태가 불안정하거나<br />서버 점검 중입니다.</p>
          </div>
        ) : (
          // 정상 작동 시 기존 콘텐츠 출력
          <>
            <p className="greeting-hi">안녕하세요 👋</p>
            <p className="greeting-name">김민준님</p>

            <TotalAssetCard accounts={accounts} hasError={hasError} />
            <QuickMenu onOpenSheet={handleOpenSheet} />
            <AccountSection accounts={accounts} onOpenSheet={handleOpenSheet} />
            <RecentTransaction transactions={transactions} />
          </>
        )}
      </main>

      {/* 3. 최하단 고정 네비게이션 */}
      <BottomNav />

      {/* 4. 바텀시트 */}
      <TransactionDetailBottomSheet 
        isOpen={isBottomSheetOpen} 
        onClose={handleCloseSheet} 
      />
    </div>
  );
}

export default App;