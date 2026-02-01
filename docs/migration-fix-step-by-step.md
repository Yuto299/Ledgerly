# 失敗したマイグレーション解決手順（ステップバイステップ）

## ステップ1: データベースの状態を確認

### 1-1. VercelダッシュボードからDATABASE_URLを取得

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. プロジェクト `ledgerly` を選択
3. Settings → Environment Variables を開く
4. `DATABASE_URL` の行を見つける
5. 目のアイコン（👁️）をクリックして値を表示
6. 値をコピー（例: `postgresql://user:password@host.neon.tech/ledgerly?sslmode=require`）

### 1-2. マイグレーション状態を確認

ローカルで以下のコマンドを実行してください（`your-production-database-url` を実際のDATABASE_URLに置き換えてください）:

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate status
```

### 1-3. 期待される出力

**失敗したマイグレーションがある場合:**
```
The following migration(s) have failed:
  X 20260117191843_add_hourly_rate_to_projects
    Started: 2026-02-01 07:56:00.072981 UTC
    Failed: [エラーメッセージ]

To resolve this issue you can:
  1. Rollback the database (migrate down)
  2. Mark the migration as rolled back: prisma migrate resolve --rolled-back 20260117191843_add_hourly_rate_to_projects
  3. Mark the migration as applied: prisma migrate resolve --applied 20260117191843_add_hourly_rate_to_projects
```

**正常な場合:**
```
Database schema is up to date!
All migrations have been applied.
```

---

## ステップ2: hourly_rateカラムの存在確認

### 2-1. Neon/SupabaseのSQLエディタで確認

1. **Neonの場合:**
   - [Neon Console](https://console.neon.tech/) にアクセス
   - プロジェクト `ledgerly` を選択
   - 「SQL Editor」を開く

2. **Supabaseの場合:**
   - [Supabase Dashboard](https://app.supabase.com/) にアクセス
   - プロジェクト `ledgerly` を選択
   - 「SQL Editor」を開く

### 2-2. SQLクエリを実行

以下のSQLを実行してください:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'projects' AND column_name = 'hourly_rate';
```

### 2-3. 結果の確認

**カラムが存在する場合:**
```
 column_name  | data_type | is_nullable
--------------+-----------+-------------
 hourly_rate  | integer   | YES
```

**カラムが存在しない場合:**
```
(0 rows)
```

---

## ステップ3: 失敗したマイグレーションを解決

### ケースA: hourly_rateカラムが存在する場合

マイグレーションは実行されたが、Prismaの記録が失敗状態になっている可能性があります。

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --applied 20260117191843_add_hourly_rate_to_projects
```

### ケースB: hourly_rateカラムが存在しない場合

マイグレーションが実際に失敗している可能性があります。

**オプション1: ロールバックとしてマークしてから再実行**

```bash
# 1. ロールバックとしてマーク
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --rolled-back 20260117191843_add_hourly_rate_to_projects

# 2. 再度マイグレーションを実行
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

**オプション2: 手動でカラムを追加してから解決としてマーク**

```sql
-- SQLエディタで実行
ALTER TABLE projects ADD COLUMN IF NOT EXISTS hourly_rate INTEGER;
```

その後:

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --applied 20260117191843_add_hourly_rate_to_projects
```

---

## ステップ4: 確認

解決後、再度状態を確認:

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate status
```

正常な場合の出力:
```
Database schema is up to date!
All migrations have been applied.
```

---

## ステップ5: Vercelで再デプロイ

1. Vercelダッシュボード → プロジェクト → Deployments
2. 「Redeploy」をクリック
3. ビルドログを確認してエラーがないか確認

---

## 次のステップ

マイグレーションが解決されたら、案件管理ページが正常に動作するはずです。

もし問題が続く場合は、ブラウザの開発者ツール（F12）でエラーメッセージを確認してください。
