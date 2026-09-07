import { accounts, transactions } from './data.js';

import Header from './components/Header';
import TotalAssetCard from './components/TotalAssetCard';
import QuickMenu from './components/QuickMenu';
import AccountSection from './components/AccountSection';
import RecentTransaction from './components/RecentTransaction';
import BottomNav from './components/BottomNav';
import { TransactionSection } from './components/TransactionSection';
import TransactionDetailBottomSheet from './components/TransactionBottomSheet/TransactionBottomSheet';
import TransferPage from './components/Transfer/TransferPage';

import './App.css';
import { useState } from 'react';

function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isTransferPageOpen, setIsTransferPageOpen] = useState(false);

  // 거래 내역 확인 바텀시트
  const handleOpenSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 이체 화면
  const handleOpenTransfer = () => {
    setIsTransferPageOpen(true);
  };

  const handleCloseTransfer = () => {
    setIsTransferPageOpen(false);
  };


  return (
    <div className="app">
      {!isTransferPageOpen ? (
        <>
          {/* 기존 메인 화면 */}
        </>
      ) : (
        <TransferPage onPageClose={handleCloseTransfer} />
      )}
    <div className="phone-frame">
      {/* 1. 최상단 고정 헤더 */}
      <Header />

      {/* 2. 스크롤되는 중앙 메인 컨텐츠 */}
      <main className="content-body">
        <p className="greeting-hi">안녕하세요 👋</p>
        <p className="greeting-name">김민준님</p>

        <TotalAssetCard accounts={accounts} />
        <QuickMenu />
        <AccountSection accounts={accounts} />
        <RecentTransaction transactions={transactions} />
      </main>

      {/* 3. 최하단 고정 네비게이션 */}
      <BottomNav />
    </div>
  );
}

export default App;