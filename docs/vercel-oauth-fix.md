# Vercelデプロイ時のOAuthエラー修正ガイド

## 問題1: `redirect_uri_mismatch` エラー（400エラー）

### 原因
Google OAuthの承認済みリダイレクトURIに、VercelのデプロイURLが登録されていないため発生します。

### 解決方法

1. **VercelのデプロイURLを確認**
   - Vercelダッシュボードでプロジェクトを開く
   - デプロイされたURLを確認（例: `https://ledgerly.vercel.app` または `https://ledgerly-xxx.vercel.app`）

2. **Google Cloud ConsoleでリダイレクトURIを追加**
   - [Google Cloud Console](https://console.cloud.google.com/)にアクセス
   - プロジェクトを選択
   - 「API とサービス」→「認証情報」を選択
   - OAuth 2.0クライアントIDをクリック
   - 「承認済みのリダイレクトURI」セクションに以下を追加：
     ```
     https://your-actual-vercel-url.vercel.app/api/auth/callback/google
     ```
   - プレビュー環境用（任意）：
     ```
     https://*.vercel.app/api/auth/callback/google
     ```
   - 「保存」をクリック

3. **Vercelの環境変数を確認**
   - Vercelダッシュボード → プロジェクト設定 → Environment Variables
   - 以下が正しく設定されているか確認：
     - `NEXTAUTH_URL`: Vercelの実際のURL（例: `https://ledgerly.vercel.app`）
     - `GOOGLE_CLIENT_ID`: Google Cloud ConsoleのクライアントID
     - `GOOGLE_CLIENT_SECRET`: Google Cloud Consoleのクライアントシークレット

4. **再デプロイ**
   - 環境変数を変更した場合は、Vercelで再デプロイが必要です
   - または、新しいデプロイをトリガーしてください

## 問題2: 新規登録時の500エラー

### 原因
データベース接続エラー、Prismaスキーマの問題、またはデフォルトデータ作成時のエラーが考えられます。

### 解決方法

1. **Vercelのデプロイログを確認**
   - Vercelダッシュボード → デプロイメント → ログを確認
   - エラーメッセージを確認

2. **環境変数の確認**
   - `DATABASE_URL`が正しく設定されているか確認
   - データベース接続文字列に`?sslmode=require`が含まれているか確認

3. **Prismaマイグレーションの確認**
   - Vercelのビルドログで`prisma migrate deploy`が正常に実行されているか確認
   - 必要に応じて、ローカルで`prisma migrate deploy`を実行して確認

4. **データベース接続の確認**
   - Neon/Supabaseのダッシュボードでデータベースが正常に動作しているか確認
   - 接続文字列が正しいか確認

## トラブルシューティング

### エラーログの確認方法

1. **Vercelダッシュボード**
   - プロジェクト → Functions → エンドポイントを選択
   - ログタブでエラーを確認

2. **ブラウザの開発者ツール**
   - NetworkタブでAPIリクエストのレスポンスを確認
   - Consoleタブでエラーメッセージを確認

### よくある問題

- **環境変数が設定されていない**: Vercelダッシュボードで環境変数を確認
- **リダイレクトURIが一致しない**: Google Cloud Consoleで正確なURLを設定
- **データベース接続エラー**: `DATABASE_URL`の接続文字列を確認
- **マイグレーション未実行**: `vercel-build`スクリプトが正しく実行されているか確認
