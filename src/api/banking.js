// src/api/banking.js
const API_BASE_URL = 'http://localhost:4000/api';

// 서버 상태 확인
export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) throw new Error('서버 상태가 정상적이지 않습니다.');
  return response.json();
};

// 계좌 목록 조회
export const fetchAccounts = async () => {
  const response = await fetch(`${API_BASE_URL}/accounts`);
  if (!response.ok) throw new Error('계좌 정보를 불러오지 못했습니다.');
  return response.json();
};

// 거래 내역 조회
export const fetchTransactions = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/transactions${query ? `?${query}` : ''}`);
  if (!response.ok) throw new Error('거래내역을 불러오지 못했습니다.');
  return response.json();
};