import Link from "next/link";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import CheckIcon from "@/components/atoms/CheckIcon";
import type { Metadata } from "next";

const baseUrl = process.env.NEXTAUTH_URL || "https://ledgerly.com";

export const metadata: Metadata = {
  title: "ホーム",
  description:
    "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。無料プランで今すぐ始められます。",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Ledgerly - フリーランス向け会計管理システム",
    description:
      "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。無料プランで今すぐ始められます。",
    url: baseUrl,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ledgerly",
      },
    ],
  },
};

const FEATURES = [
  {
    icon: "description",
    title: "請求書作成",
    description:
      "プロフェッショナルな請求書を数クリックで作成。PDF出力で即送付可能。",
    points: ["PDF自動生成", "明細・備考対応"],
  },
  {
    icon: "credit_card",
    title: "経費管理",
    description: "カテゴリ別・案件別に経費を記録。確定申告の準備もスムーズに。",
    points: ["カテゴリ分類", "CSV出力対応"],
  },
  {
    icon: "trending_up",
    title: "売上分析",
    description: "月別・案件別の売上をグラフで可視化。ビジネスの状況を一目で把握。",
    points: ["売上推移グラフ", "案件別収支"],
  },
];

const BENEFITS = [
  {
    icon: "bolt",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    title: "登録後3分で請求書完成",
    description:
      "面倒な初期設定は一切不要。テンプレートを選んで、顧客情報と金額を入力するだけ。今日から請求業務を効率化できます。",
  },
  {
    icon: "touch_app",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    title: "迷わない操作性",
    description:
      "会計ソフトが初めての方でも安心。直感的なデザインで、やりたいことがすぐに見つかる。ストレスフリーな会計管理を実現します。",
  },
  {
    icon: "verified",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    title: "ずっと無料で使える",
    description:
      "月10件までの請求書なら永久無料。クレジットカードの登録も不要。事業が成長したら、お得な有料プランへ簡単アップグレード。",
  },
];

const PLANS = [
  {
    name: "フリープラン",
    price: "¥0",
    period: "/月",
    tagline: "個人事業を始めたばかりの方に",
    features: [
      "請求書作成（月10件まで）",
      "基本的な経費管理",
      "顧客管理（10件まで）",
      "基本的なレポート",
      "PDF出力",
    ],
    cta: "無料で始める",
    featured: false,
    disabled: false,
  },
  {
    name: "スタンダードプラン",
    price: "¥580",
    period: "/月",
    tagline: "安定した収入がある方に",
    features: [
      "請求書作成（月15件まで）",
      "経費管理・分析",
      "顧客管理（15件まで）",
      "詳細なレポート",
      "CSV出力",
    ],
    cta: "スタンダードを始める",
    featured: true,
    disabled: false,
  },
  {
    name: "プレミアムプラン",
    price: "近日公開",
    period: "",
    tagline: "本格的にビジネスを成長させたい方に",
    features: [
      "請求書作成（無制限）",
      "高度な経費管理・分析",
      "顧客管理（無制限）",
      "詳細なレポート・分析",
      "優先サポート",
    ],
    cta: "近日公開",
    featured: false,
    disabled: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/90 border-b border-gray-200/80 sticky top-0 z-50">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
          aria-label="メインナビゲーション"
        >
          <Logo href="/" size="md" />
          <Link href="/login">
            <Button aria-label="ログインページへ">ログイン</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium tracking-wide">
                フリーランス・個人事業主向け
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.12] tracking-tight">
                会計管理を、
                <br />
                もっとシンプルに。
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                請求書作成から経費管理、売上分析まで。フリーランスの会計業務を一つのツールで完結させましょう。
              </p>

              <div>
                <Link href="/signup">
                  <Button size="lg" aria-label="無料で会員登録を始める">
                    今すぐ無料で始める
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-600" />
                  <span>クレジットカード不要</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-600" />
                  <span>30秒で登録完了</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-600" />
                  <span>無料プランで全機能利用可</span>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative mt-8 lg:mt-0 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 border border-gray-200/80 overflow-hidden">
                <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2 font-medium">
                    Ledgerly Dashboard
                  </span>
                </div>
                <div className="p-4 sm:p-6 bg-gray-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200/80">
                      <div className="text-xs text-gray-500 mb-1">今月の売上</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900 tabular-nums">
                        ¥850,000
                      </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200/80">
                      <div className="text-xs text-gray-500 mb-1">今月の経費</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900 tabular-nums">
                        ¥120,000
                      </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200/80">
                      <div className="text-xs text-gray-500 mb-1">利益</div>
                      <div className="text-base sm:text-lg font-bold text-green-600 tabular-nums">
                        ¥730,000
                      </div>
                    </div>
                  </div>
                  <div className="h-32 sm:h-40 bg-white rounded-xl border border-gray-200/80 flex items-end justify-around p-3 sm:p-4">
                    <div className="w-6 sm:w-8 md:w-10 bg-slate-200 rounded-t" style={{ height: "40%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-slate-300 rounded-t" style={{ height: "65%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-slate-800 rounded-t" style={{ height: "85%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-slate-600 rounded-t" style={{ height: "70%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-slate-200 rounded-t" style={{ height: "30%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-24 px-4 bg-white"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              必要な機能を、すべて
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              フリーランスの会計業務に必要な機能を厳選
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 transition-all hover:shadow-md hover:border-gray-300"
              >
                <div
                  className="bg-slate-100 text-slate-700 rounded-lg w-11 h-11 flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center text-sm text-gray-600 leading-relaxed"
                    >
                      <CheckIcon className="w-4 h-4 mr-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="py-24 px-4 bg-gray-50"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              id="benefits-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              なぜLedgerlyなのか
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              フリーランスのために設計された3つの理由
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/80 transition-all hover:shadow-md hover:border-gray-300"
              >
                <div
                  className={`rounded-xl w-14 h-14 flex items-center justify-center mb-6 ${benefit.iconBg} ${benefit.iconText}`}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {benefit.icon}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {benefit.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-7">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        className="py-24 px-4 bg-white"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium tracking-wide">
                シンプルな料金プラン
              </span>
            </div>
            <h2
              id="pricing-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              あなたに合ったプランを
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              まずは無料で始めて、成長に合わせてアップグレード
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-start">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`relative bg-white rounded-xl p-6 sm:p-8 transition-all ${
                  plan.featured
                    ? "border-2 border-slate-900 md:-mt-2"
                    : "border border-gray-200/80 hover:border-gray-300"
                } ${plan.disabled ? "opacity-70" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="bg-slate-900 text-white px-3.5 py-1 rounded-full text-xs font-semibold"
                      aria-label="おすすめプラン"
                    >
                      おすすめ
                    </span>
                  </div>
                )}
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="flex items-end justify-center gap-2 mb-4">
                    <span
                      className={`font-bold leading-none tracking-tight text-gray-900 ${
                        plan.disabled
                          ? "text-2xl sm:text-3xl text-gray-500"
                          : "text-4xl sm:text-5xl"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 mb-1.5 text-sm sm:text-base">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon
                        className={`w-5 h-5 mr-3 mt-0.5 ${plan.disabled ? "text-gray-300" : ""}`}
                      />
                      <span className={plan.disabled ? "text-gray-500" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.disabled ? (
                  <Button
                    className="w-full py-3"
                    variant="secondary"
                    disabled
                    aria-label={`${plan.name}近日公開`}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href="/signup" className="block">
                    <Button
                      className="w-full py-3"
                      variant={plan.featured ? "primary" : "secondary"}
                      aria-label={`${plan.name}で登録`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-4 bg-slate-900 text-white"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold mb-4 leading-tight tracking-tight"
          >
            今すぐ始めませんか？
          </h2>
          <p className="text-base sm:text-lg mb-8 text-slate-300 leading-relaxed">
            アカウント作成は30秒。今日から会計業務を効率化。
          </p>
          <Link href="/signup" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              aria-label="無料で会員登録を開始"
            >
              無料で始める
            </Button>
          </Link>
          <p className="mt-6 text-sm text-slate-400">
            まずは無料で試せる • 解約自由 • データ安全管理
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-4 bg-gray-900 text-gray-400"
        aria-label="フッター"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <span
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-sm">L</span>
                </span>
                <span className="text-xl font-bold text-white">Ledgerly</span>
              </div>
              <p className="text-sm">フリーランスの会計管理をシンプルに</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">
                &copy; 2026 Ledgerly. All rights reserved.
              </p>
              <p className="text-xs mt-2 text-gray-500">
                個人事業主・フリーランス向け会計管理システム
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
