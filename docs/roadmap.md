# 実装ロードマップ

## Phase 1: 基盤構築 ✅

### 1.1 プロジェクト初期設定 ✅

- [x] package.json 設定
- [x] TypeScript 設定
- [x] Next.js 設定
- [x] Tailwind CSS 設定
- [x] Docker Compose（PostgreSQL）
- [x] 環境変数テンプレート

### 1.2 データベース設定 ✅

- [x] Prisma スキーマ定義
- [x] テーブル設計
- [x] マイグレーション設定
- [x] Seed データ作成

### 1.3 認証システム ✅

- [x] NextAuth 設定
- [x] ログイン画面
- [x] セッション管理
- [x] 認証ミドルウェア

### 1.4 基本 UI ✅

- [x] Atomic Design コンポーネント（Button, Input, Card, Badge, Label）
- [x] FormField（Molecule）
- [x] Sidebar / Header（Organism）
- [x] ダッシュボードレイアウト

---

## Phase 2: 顧客・案件管理 ✅

### 2.1 顧客管理（Backend）✅

- [x] CustomerRepository（CRUD 操作）
- [x] Customer スキーマ（Zod）
- [x] Usecase 実装
  - [x] CreateCustomer
  - [x] UpdateCustomer
  - [x] DeleteCustomer（論理削除）
  - [x] GetCustomerById
  - [x] ListCustomers（ページネーション）
- [x] API Route Handlers
  - [x] GET /api/customers
  - [x] POST /api/customers
  - [x] GET /api/customers/:id
  - [x] PUT /api/customers/:id
  - [x] DELETE /api/customers/:id

### 2.2 顧客管理（Frontend）✅

- [x] 顧客一覧画面
- [x] 顧客詳細画面
- [x] 顧客作成フォーム
- [x] 顧客編集フォーム
- [x] TanStack Query 統合

### 2.3 案件管理（Backend）✅

- [x] ProjectRepository（CRUD 操作）
- [x] Project スキーマ（Zod）
- [x] Usecase 実装
  - [x] CreateProject
  - [x] UpdateProject
  - [x] DeleteProject
  - [x] GetProjectById
  - [x] ListProjects（フィルタ・ページネーション）
- [x] API Route Handlers
  - [x] GET /api/projects
  - [x] POST /api/projects
  - [x] GET /api/projects/:id
  - [x] PUT /api/projects/:id
  - [x] DELETE /api/projects/:id

### 2.4 案件管理（Frontend）✅

- [x] 案件一覧画面
- [x] 案件詳細画面（請求書・経費一覧含む）
- [x] 案件作成フォーム
- [x] 案件編集フォーム

---

## Phase 3: 請求書・入金管理 ✅

### 3.1 請求書管理（Backend）✅

- [x] InvoiceRepository
- [x] InvoiceItemRepository
- [x] Invoice スキーマ（Zod）
- [x] Domain Service: InvoiceService
  - [x] 明細から合計金額を算出
  - [x] ステータス更新ロジック
- [x] Usecase 実装
  - [x] CreateInvoice（明細含む）
  - [x] UpdateInvoice
  - [x] DeleteInvoice
  - [x] MarkInvoiceSent（送付済み）
  - [x] GetInvoiceById（明細・入金履歴含む）
  - [x] ListInvoices（フィルタ・ページネーション）
- [x] API Route Handlers
  - [x] GET /api/invoices
  - [x] POST /api/invoices
  - [x] GET /api/invoices/:id
  - [x] PUT /api/invoices/:id
  - [x] DELETE /api/invoices/:id
  - [x] POST /api/invoices/:id/send

### 3.2 請求書管理（Frontend）✅

- [x] 請求書一覧画面
- [x] 請求書詳細画面
- [x] 請求書作成フォーム
  - [x] 明細テーブル（動的追加・削除）
  - [x] 合計金額自動計算
- [x] 請求書編集フォーム

### 3.3 入金管理（Backend）✅

- [x] PaymentRepository
- [x] Payment スキーマ（Zod）
- [x] Domain Service: PaymentService
  - [x] 入金合計計算
  - [x] 自動 PAID 更新ロジック
- [x] Usecase 実装
  - [x] RegisterPayment（入金登録 + ステータス自動更新）
  - [x] UpdatePayment
  - [x] DeletePayment（入金削除 + ステータス再計算）
  - [x] ListPaymentsByInvoice
- [x] API Route Handlers
  - [x] POST /api/invoices/:id/payments
  - [x] GET /api/invoices/:id/payments
  - [x] PUT /api/payments/:id
  - [x] DELETE /api/payments/:id

### 3.4 入金管理（Frontend）✅

- [x] 入金登録フォーム（モーダル）
- [x] 入金履歴一覧（請求書詳細内）
- [x] 入金削除機能

---

## Phase 4: 経費管理 ✅

### 4.1 経費カテゴリ管理（Backend）✅

- [x] ExpenseCategoryRepository
- [x] ExpenseCategory スキーマ（Zod）
- [x] Usecase 実装
  - [x] CreateExpenseCategory
  - [x] UpdateExpenseCategory
  - [x] DeleteExpenseCategory
  - [x] ListExpenseCategories
- [x] API Route Handlers
  - [x] GET /api/expense-categories
  - [x] POST /api/expense-categories
  - [x] PUT /api/expense-categories/:id
  - [x] DELETE /api/expense-categories/:id

### 4.2 経費管理（Backend）✅

- [x] ExpenseRepository
- [x] Expense スキーマ（Zod）
- [x] Usecase 実装
  - [x] CreateExpense
  - [x] UpdateExpense
  - [x] DeleteExpense
  - [x] GetExpenseById
  - [x] ListExpenses（フィルタ・ページネーション）
- [x] API Route Handlers
  - [x] GET /api/expenses
  - [x] POST /api/expenses
  - [x] GET /api/expenses/:id
  - [x] PUT /api/expenses/:id
  - [x] DELETE /api/expenses/:id

### 4.3 経費管理（Frontend）✅

- [x] 経費一覧画面
- [x] 経費作成フォーム
- [x] 経費編集フォーム
- [x] 経費カテゴリ設定画面

---

## Phase 5: レポート・ダッシュボード ✅

### 5.1 レポート API（Backend）✅

- [x] ReportService（集計ロジック）
  - [x] 月次売上集計（入金ベース / 請求ベース）
  - [x] 月次経費集計
  - [x] 利益計算
  - [x] 未回収金額集計
  - [x] 案件別集計
  - [x] 経費カテゴリ別集計
- [x] Usecase 実装
  - [x] GetMonthlySummary
  - [x] GetProjectReport
  - [x] GetExpenseBreakdown
- [x] API Route Handlers
  - [x] GET /api/reports/monthly?month=YYYY-MM
  - [x] GET /api/reports/trend?months=N
  - [x] GET /api/reports/expenses?month=YYYY-MM
  - [x] GET /api/reports/projects?month=YYYY-MM
  - [x] GET /api/reports/dashboard?month=YYYY-MM

### 5.2 ダッシュボード（Frontend）✅

- [x] 月次サマリカード（売上・経費・利益・未回収）
- [x] 月別推移グラフ（Recharts）
  - [x] 売上・経費・利益の折れ線グラフ
- [x] 経費カテゴリ別内訳（円グラフ）
- [x] 案件別売上ランキング（棒グラフ）
- [x] 最近の請求書一覧
- [x] 最近の経費一覧

### 5.3 レポート画面（Frontend）✅

- [x] 月別レポート画面
- [x] 案件別レポート画面
- [ ] CSV エクスポート（将来）

---

## Phase 6: テスト

### 6.1 単体テスト

- [ ] Domain 層のテスト
  - [ ] 金額計算ロジック
  - [ ] ステータス遷移
  - [ ] 集計ロジック
- [ ] ユーティリティ関数のテスト

### 6.2 統合テスト

- [ ] Usecase 層のテスト
  - [ ] 請求書作成 + 明細
  - [ ] 入金登録 + 自動 PAID 更新
  - [ ] 経費登録
- [ ] API Route Handlers のテスト

### 6.3 E2E テスト（任意）

- [ ] ログイン → ダッシュボード
- [ ] 請求書作成 → 入金登録 → ダッシュボード反映

---

## Phase 7: 改善・拡張

### 7.1 UX 改善

- [ ] ローディング状態の表示
- [ ] エラーハンドリング強化
- [ ] バリデーションメッセージの改善
- [ ] レスポンシブ対応

### 7.2 機能追加

- [ ] 請求書 PDF 出力
- [ ] CSV エクスポート
- [ ] 支払期限アラート
- [ ] メール通知（請求書送付）
- [ ] 定期請求（月次自動発行）
- [ ] 見積書管理
- [ ] 領収書管理

### 7.3 パフォーマンス最適化

- [ ] DB クエリ最適化
- [ ] キャッシュ戦略
- [ ] ページネーション改善
- [ ] 画像最適化

### 7.4 セキュリティ強化

- [ ] レート制限
- [ ] CSRF 対策
- [ ] XSS 対策
- [ ] SQL Injection 対策（Prisma 使用で基本的に防止済み）

---

## 優先順位

### 高優先度（MVP 必須）

1. ✅ プロジェクト初期設定
2. ✅ 認証システム
3. 顧客管理（Backend + Frontend）
4. 案件管理（Backend + Frontend）
5. 請求書管理（Backend + Frontend）
6. 入金管理（Backend + Frontend）
7. 経費管理（Backend + Frontend）
8. 基本的なダッシュボード

### 中優先度

9. レポート機能（詳細）
10. グラフ表示
11. 単体テスト
12. 統合テスト

### 低優先度（将来拡張）

13. PDF 出力
14. CSV エクスポート
15. メール通知
16. E2E テスト
17. 定期請求
18. 見積書管理

---

## 実装進捗

| Phase   | 進捗 | 備考         |
| ------- | ---- | ------------ |
| Phase 1 | 100% | 完了         |
| Phase 2 | 100% | 完了         |
| Phase 3 | 100% | 完了         |
| Phase 4 | 100% | 完了         |
| Phase 5 | 100% | 完了         |
| Phase 6 | 0%   | 次のステップ |
| Phase 7 | 0%   | -            |

**全体進捗: 71%**（Phase 1-5 完了）
