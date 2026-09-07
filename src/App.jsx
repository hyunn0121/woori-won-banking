import { useState } from 'react';
import './App.css';
import { TransactionSection } from './components/TransactionSection'; 
import TransactionDetailBottomSheet from './components/TransactionBottomSheet/TransactionBottomSheet';


function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="app">
      <TransactionSection /> 

    </div>
  );
}

export default App;