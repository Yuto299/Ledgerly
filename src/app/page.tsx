import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* メインコンテンツ */}
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Ledgerly
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-medium">
              副業・個人事業向け売上・経費管理システム
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              顧客・案件・請求・入金・経費を一元管理し、
              <br className="hidden sm:block" />
              月次・案件別の利益を可視化します
            </p>

            <Link
              href="/login"
              className="inline-block px-10 py-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl font-semibold text-lg"
            >
              ログイン
            </Link>
          </div>

          {/* 機能カード */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div
              className="glass rounded-2xl p-8 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-5xl mb-4 animate-float">📊</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                月次ダッシュボード
              </h3>
              <p className="text-gray-600 leading-relaxed">
                売上・経費・利益を自動集計し、グラフで可視化
              </p>
            </div>
            <div
              className="glass rounded-2xl p-8 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="text-5xl mb-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                💰
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                請求書管理
              </h3>
              <p className="text-gray-600 leading-relaxed">
                明細付き請求書の作成・送付・入金管理
              </p>
            </div>
            <div
              className="glass rounded-2xl p-8 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div
                className="text-5xl mb-4 animate-float"
                style={{ animationDelay: "2s" }}
              >
                📁
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                案件別管理
              </h3>
              <p className="text-gray-600 leading-relaxed">
                顧客・案件・請求・経費を紐づけて管理
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
