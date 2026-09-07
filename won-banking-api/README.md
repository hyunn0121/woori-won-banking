# WON 실습뱅킹 API 서버

`api-specification.html` 명세를 그대로 구현한 Express.js 실습 서버입니다. 인증 없이, 인메모리 더미 데이터로 동작합니다.

## 실행 방법

```bash
npm install
npm start
```

서버가 `http://localhost:4000` 에서 실행됩니다. 콘솔에 다음 메시지가 뜨면 정상입니다.

```
WON 실습뱅킹 API 서버가 http://localhost:4000 에서 실행 중입니다
예: http://localhost:4000/api/accounts
```

개발 중 파일을 저장할 때마다 자동 재시작하려면:

```bash
npm run dev
```

## 빠른 테스트 (curl)

```bash
# 계좌 목록
curl http://localhost:4000/api/accounts

# 거래내역 (특정 계좌, 출금만, 최대 5건)
curl "http://localhost:4000/api/transactions?accountId=acc1&type=out&limit=5"

# 예금주 조회
curl -G "http://localhost:4000/api/transfer/lookup" \
  --data-urlencode "bank=우리은행" \
  --data-urlencode "accountNo=1002987654321"

# 이체 실행
curl -X POST http://localhost:4000/api/transfers \
  -H "Content-Type: application/json" \
  -d '{"fromAccountId":"acc1","toBank":"우리은행","toAccountNo":"1002987654321","toOwnerName":"이서연","amount":30000}'
```

## 파일 구조

```
won-banking-api/
├── server.js              # Express 앱, 라우트 정의
├── data.js                 # 인메모리 더미 데이터 (계좌, 거래내역, 예금주 조회 테이블)
├── package.json
└── README.md
```

## 참고 사항

- **서버를 재시작하면 이체로 바뀐 잔액과 새로 생긴 거래내역은 초기값으로 리셋됩니다.** (인메모리 데이터이기 때문입니다. DB 연동은 다음 실습 단계 과제로 남겨두었습니다.)
- CORS를 모든 origin에 대해 열어두었습니다 (`app.use(cors())`). 실습용 프론트엔드(`won-banking-style-mockup.html` 등)를 어떤 방식으로 열어도 API를 호출할 수 있습니다.
- 이체 API(`POST /api/transfers`)는 클라이언트가 보낸 금액을 그대로 신뢰하지 않고, **서버에서 잔액·최소금액을 다시 검증**합니다. 이 부분이 이 실습에서 가장 중요한 포인트입니다 — 프론트엔드 검증은 사용자 경험을 위한 것이고, 진짜 보안/정합성 검증은 항상 서버에서 이뤄져야 합니다.
- 등록된 더미 계좌번호(예금주 조회용): `1002123456789`(김민준), `1002987654321`(이서연), `1102555666777`(박지훈)

## 이어지는 실습 아이디어

- `data.js`를 실제 데이터베이스(SQLite부터 시작해도 좋음)로 교체하기
- 로그인/인증 미들웨어 추가하기 (지금은 인증이 없어 누구나 모든 계좌에 접근 가능합니다 — 실무라면 심각한 보안 결함입니다)
- 이체 한도, 1일 누적 이체금액 제한 등 비즈니스 규칙 추가하기
- Jest + Supertest로 각 엔드포인트에 대한 자동화 테스트 작성하기
