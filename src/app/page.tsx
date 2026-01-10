import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Ledgerly</h1>
        <p className="text-xl text-gray-600 mb-8">
          副業・個人事業向け売上・経費管理システム
        </p>
        <p className="text-gray-600 mb-12">
          顧客・案件・請求・入金・経費を一元管理し、
          <br />
          月次・案件別の利益を可視化します
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            ダッシュボード
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">
              📊 月次ダッシュボード
            </h3>
            <p className="text-sm text-gray-600">
              売上・経費・利益を自動集計し、グラフで可視化
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">💰 請求書管理</h3>
            <p className="text-sm text-gray-600">
              明細付き請求書の作成・送付・入金管理
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">📁 案件別管理</h3>
            <p className="text-sm text-gray-600">
              顧客・案件・請求・経費を紐づけて管理
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
