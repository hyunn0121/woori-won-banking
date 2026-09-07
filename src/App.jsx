import { useState } from 'react';
import './App.css';
import TransactionDetailBottomSheet from './components/TransactionBottomSheet/TransactionBottomSheet';
import TransferPage from './components/Transfer/TransferPage';


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
    </div>
  );
}

export default App;