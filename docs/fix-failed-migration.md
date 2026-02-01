# 失敗したマイグレーションの解決方法

## エラー内容

```
Error: P3009
migrate found failed migrations in the target database, new migrations will not be applied.
The `20260117191843_add_hourly_rate_to_projects` migration started at 2026-02-01 07:56:00.072981 UTC failed
```

## 原因

`20260117191843_add_hourly_rate_to_projects` マイグレーションが失敗し、その記録がデータベースに残っているため、新しいマイグレーションが適用できません。

## 解決方法

### 方法1: 失敗したマイグレーションを解決としてマーク（推奨）

マイグレーションが実際には適用されている場合（カラムが既に存在する場合）:

```bash
# VercelからDATABASE_URLを取得して実行
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --applied 20260117191843_add_hourly_rate_to_projects
```

### 方法2: 失敗したマイグレーションをロールバックとしてマーク

マイグレーションが適用されていない場合:

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --rolled-back 20260117191843_add_hourly_rate_to_projects
```

### 方法3: データベースを直接確認・修正

1. **データベースの状態を確認**

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate status
```

2. **hourly_rateカラムが存在するか確認**

```sql
-- Neon/SupabaseのSQLエディタで実行
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'projects' AND column_name = 'hourly_rate';
```

3. **カラムが存在する場合**: 方法1を実行
4. **カラムが存在しない場合**: 
   - 方法2を実行してから、再度マイグレーションを実行
   - または、手動でカラムを追加

### 方法4: 手動でカラムを追加（緊急時）

データベースに直接SQLを実行:

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS hourly_rate INTEGER;
```

その後、失敗したマイグレーションを解決としてマーク:

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --applied 20260117191843_add_hourly_rate_to_projects
```

## 手順

### ステップ1: データベースの状態を確認

```bash
# VercelダッシュボードからDATABASE_URLを取得
# Settings → Environment Variables → DATABASE_URL

# マイグレーション状態を確認
DATABASE_URL="your-production-database-url" npx prisma migrate status
```

### ステップ2: hourly_rateカラムの存在確認

Neon/SupabaseのSQLエディタで実行:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' AND column_name = 'hourly_rate';
```

### ステップ3: マイグレーションを解決

**カラムが存在する場合:**
```bash
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --applied 20260117191843_add_hourly_rate_to_projects
```

**カラムが存在しない場合:**
```bash
# まずロールバックとしてマーク
DATABASE_URL="your-production-database-url" npx prisma migrate resolve --rolled-back 20260117191843_add_hourly_rate_to_projects

# その後、再度マイグレーションを実行
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

### ステップ4: 確認

```bash
DATABASE_URL="your-production-database-url" npx prisma migrate status
```

正常な場合の出力:
```
Database schema is up to date!
All migrations have been applied.
```

### ステップ5: Vercelで再デプロイ

マイグレーションが解決されたら、Vercelで再デプロイを実行してください。

## 今後の対策

### ビルドコマンドからマイグレーションを削除

`vercel.json` の `buildCommand` から `prisma migrate deploy` を削除し、手動でマイグレーションを実行するように変更:

```json
{
  "buildCommand": "prisma generate && next build"
}
```

これにより、ビルド時のタイムアウトエラーを回避できます。

## 注意事項

- 本番データベースに対して操作を行う前に、必ずバックアップを取得してください
- マイグレーションの解決は慎重に行ってください
- 不明な点がある場合は、開発環境で先にテストしてください
